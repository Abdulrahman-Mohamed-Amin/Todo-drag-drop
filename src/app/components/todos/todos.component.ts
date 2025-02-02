import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from '../../Modals/task';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-todos',
  imports: [MatIconModule , MatInputModule , MatFormFieldModule ,MatCardModule , ReactiveFormsModule , CdkDrag , CdkDropList],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

  tasks:Task[] = []
  proccessing:Task[] = []
  done:Task[] = []
  isEdit:boolean = false
  index:any;
  form: FormGroup ;
  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      item : ['' , [Validators.minLength(3) , Validators.required]]
    })
  }
  add(){
   this.tasks.push({
    title: this.form.value.item,
    complete : false
   })
   this.form.reset()
  }
  update(){
    this.tasks[this.index].title = this.form.value.item
    console.log(this.form.value , this.index);
    this.form.reset()
    this.isEdit = false
  }

  delete(idx:number){
    this.tasks.splice(idx , 1)
  }
  deleteInProcc(idx:number){
    this.proccessing.splice(idx , 1)

  }
  deleteInDone(idx:number){
    this.done.splice(idx , 1)

  }

  onEdit(item:Task , idx:number){
    this.form.controls['item'].setValue(item.title)
    this.isEdit = true
    this.index = idx
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
