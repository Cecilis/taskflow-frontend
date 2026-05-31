import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  
  // Signals para estado reactivo
  tasks = signal<Task[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  searchTerm = signal<string>('');  // ✅ NUEVO: término de búsqueda
  
  // ✅ NUEVO: tareas filtradas (se actualiza automáticamente cuando cambia tasks o searchTerm)
  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.tasks();
    }
    return this.tasks().filter(task => 
      task.title.toLowerCase().includes(term) || 
      (task.description && task.description.toLowerCase().includes(term))
    );
  });
  
  // Nueva tarea (para el formulario)
  newTask: Task = {
    title: '',
    description: '',
    completed: false
  };
  
  // Tarea en edición
  editingTask: Task | null = null;
  
  // Propiedades para la importación CSV
  selectedFile: File | null = null;
  importing = signal<boolean>(false);
  importMessage = signal<string | null>(null);
  importError = signal<string | null>(null);
  
  ngOnInit(): void {
    this.loadTasks();
  }
  
  // Cargar todas las tareas
  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Error al cargar las tareas: ' + err.message);
        this.loading.set(false);
      }
    });
  }
  
  // ✅ NUEVO: actualizar término de búsqueda
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
  
  // ✅ NUEVO: limpiar búsqueda
  clearSearch(): void {
    this.searchTerm.set('');
    // Limpiar el input visualmente
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  }
  
  // Crear nueva tarea
  createTask(): void {
    if (!this.newTask.title.trim()) {
      return;
    }
    
    this.taskService.createTask(this.newTask).subscribe({
      next: (newTask) => {
        this.tasks.update(tasks => [newTask, ...tasks]);
        this.newTask = { title: '', description: '', completed: false };
      },
      error: (err) => {
        this.error.set('Error al crear la tarea: ' + err.message);
      }
    });
  }
  
  // Cambiar estado (completado/no completado)
  toggleTask(task: Task): void {
    this.taskService.toggleTaskStatus(task.id!).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
        );
      },
      error: (err) => {
        this.error.set('Error al actualizar el estado: ' + err.message);
      }
    });
  }
  
  // Iniciar edición
  startEdit(task: Task): void {
    this.editingTask = { ...task };
  }
  
  // Guardar edición
  saveEdit(): void {
    if (this.editingTask && this.editingTask.title.trim()) {
      this.taskService.updateTask(this.editingTask.id!, this.editingTask).subscribe({
        next: (updatedTask) => {
          this.tasks.update(tasks =>
            tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
          );
          this.editingTask = null;
        },
        error: (err) => {
          this.error.set('Error al actualizar la tarea: ' + err.message);
        }
      });
    }
  }
  
  // Cancelar edición
  cancelEdit(): void {
    this.editingTask = null;
  }
  
  // Eliminar tarea
  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks.update(tasks => tasks.filter(t => t.id !== id));
        },
        error: (err) => {
          this.error.set('Error al eliminar la tarea: ' + err.message);
        }
      });
    }
  }
  
  // Métodos para importación CSV
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.importMessage.set(null);
      this.importError.set(null);
    }
  }
  
  importCSV(): void {
    if (!this.selectedFile) {
      this.importError.set('Por favor selecciona un archivo CSV');
      return;
    }
    
    this.importing.set(true);
    this.importMessage.set(null);
    this.importError.set(null);
    
    this.taskService.importTasksFromCSV(this.selectedFile).subscribe({
      next: (response: any) => {
        this.importing.set(false);
        this.importMessage.set(`✅ ${response.importedCount} tareas importadas exitosamente`);
        this.loadTasks();
        this.selectedFile = null;
        
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err: any) => {
        this.importing.set(false);
        this.importError.set(`❌ Error al importar: ${err.error?.error || err.message}`);
      }
    });
  }
}