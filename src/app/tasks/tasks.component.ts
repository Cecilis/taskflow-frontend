import { Component, inject, OnInit, signal } from '@angular/core';
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
  
  // Signals para estado reactivo (nuevo en Angular 19)
  tasks = signal<Task[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  // Nueva tarea (para el formulario)
  newTask: Task = {
    title: '',
    description: '',
    completed: false
  };
  
  // Tarea en edición
  editingTask: Task | null = null;
  
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
  
  // Crear nueva tarea
  createTask(): void {
    if (!this.newTask.title.trim()) {
      return;
    }
    
    this.taskService.createTask(this.newTask).subscribe({
      next: (newTask) => {
        // Actualizar la lista con la nueva tarea (usando spread operator)
        this.tasks.update(tasks => [newTask, ...tasks]);
        // Limpiar el formulario
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
        // Actualizar la tarea en la lista
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
    this.editingTask = { ...task }; // Copia para no modificar el original
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
          // Filtrar la tarea eliminada
          this.tasks.update(tasks => tasks.filter(t => t.id !== id));
        },
        error: (err) => {
          this.error.set('Error al eliminar la tarea: ' + err.message);
        }
      });
    }
  }
}