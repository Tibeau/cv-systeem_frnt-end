import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnChanges {
  @Input() modal = false;
  @Input() id = 0;
  @Input() item = "";
  @Input() category = "";

  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() closeModalEvent = new EventEmitter<boolean>();

  showModal: boolean = false;
  faXmark = faXmark;
  faTriangleExclamation = faTriangleExclamation;

  constructor() { }

  ngOnChanges() {
    this.showModal = this.modal;
  }

  closeDeleteModal(){
    this.showModal = false;
    this.closeModalEvent.emit(false)
  }

  deleteItem(id: number) {
    this.deleteItemEvent.emit(id);
    this.closeDeleteModal();
  }

}
