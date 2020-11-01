import { Component, OnInit } from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  public taskForm: FormGroup;
  public showSection: boolean[] = [];
  public optionButtons = [
    { name: 'subtasks', tooltip: 'home.tasks.createForm.subtasks.label', icon: 'pi pi-check-circle' },
    { name: 'description', tooltip: 'home.tasks.createForm.description.label', icon: 'pi pi-pencil' },
    { name: 'tags', tooltip: 'home.tasks.createForm.tags.label', icon: 'pi pi-tags' },
    { name: 'priority', tooltip: 'home.tasks.createForm.priority.label', icon: 'pi pi-bookmark' },
    { name: 'remindingDate', tooltip: 'home.tasks.createForm.remindingDate.label', icon: 'pi pi-bell' },
    { name: 'expirationDate', tooltip: 'home.tasks.createForm.expirationDate.label', icon: 'pi pi-calendar-times' },
    { name: 'share', tooltip: 'home.tasks.createForm.share.label', icon: 'pi pi-share-alt' },
    { name: 'collection', tooltip: 'home.tasks.createForm.collection.label', icon: 'pi pi-inbox' }
  ];
  public collectionOptions = [
    { label: 'My tasks', value: 0 }
  ];

  public priorityOptions: SelectItem[];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.get([
      'home.tasks.createForm.priority.values.none',
      'home.tasks.createForm.priority.values.low',
      'home.tasks.createForm.priority.values.medium',
      'home.tasks.createForm.priority.values.high'
    ])
      .subscribe(translations => {
        this.priorityOptions = [
          { label: translations['home.tasks.createForm.priority.values.none'], value: 0 },
          { label: translations['home.tasks.createForm.priority.values.low'], value: 1 },
          { label: translations['home.tasks.createForm.priority.values.medium'], value: 2 },
          { label: translations['home.tasks.createForm.priority.values.high'], value: 3 }
        ];
      });

    this.taskForm = this.formBuilder.group({
      checked: [false],
      label: ['', [ Validators.required, Validators.minLength(1) ]],
      description: [''],
      tags: [null],
      priority: [0, [ Validators.required ]],
      pinned: [false, Validators.required],
      expirationDate: [null],
      remindingDate: [null],
      collection: ['']
    });
  }
}
