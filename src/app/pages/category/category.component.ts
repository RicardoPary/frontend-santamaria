import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../shared/services';
import {LocalStorageService} from 'ngx-webstorage';
import {Subscription} from 'rxjs/index';
import {StaffService} from '../../shared/services';
import {AlertService} from '../../shared/components/alert/alert.service';
import {CategoryFilter} from '../../shared/models/category.model';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit, OnDestroy {

  modal: NgbModalRef;
  title = '';
  type = '';
  category: any;
  idBranch: any;
  subscriptionBranchService: Subscription = new Subscription();


  subscriptionTable: Subscription;
  totalData: number;
  pageSize: number;
  page: number;
  data: any = [];

  constructor(private modalService: NgbModal,
              private categoryService: CategoryService,
              private alertService: AlertService,
              public activeModal: NgbActiveModal,
              private productService: StaffService,
              private $localStorage: LocalStorageService) {

    this.categoryService.currentCategoryFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(categoryFilter: CategoryFilter) {
    this.categoryService.getAllCategories(categoryFilter).subscribe(res => {
      this.totalData = parseFloat(res.headers.get('X-Total-Count'));
      this.data = res.body;
    });
  }

  ngOnDestroy() {
    this.subscriptionBranchService ? this.subscriptionBranchService.unsubscribe() : '';
    this.subscriptionTable ? this.subscriptionTable.unsubscribe() : '';
  }

  openModal(content, title, type, category) {
    this.title = title;
    this.type = type;
    category ? this.category = category : this.category = null;
    this.modal = this.modalService.open(content, {backdrop: 'static'});
  }

  openModalUpdateImage(categoty) {
    /*const modalRef = this.modalService.open(CropperModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.urlImage = 'api/categories/' + categoty.id + '/update-photo';
    modalRef.componentInstance.entity = 'company';
    modalRef.componentInstance.title = 'cambiar imagen de categoria';*/
  }

  deleteCategory(id) {
    /*this.alertService.showWarningQuestion({
      html: 'Al eliminar la categoria tambien se eliminaran los items de contenido.' +
        '<br>Esta seguro de eliminar la categoria?'
    }, () => {

      this.productService.deleteProductByCategory(id).subscribe(
        () => {
          this.categoryService.deleteCategory(id).subscribe(
            res => {
              if (res.status === 200) {
                this.deleteCategoryArray(this.categories, id);
                this.alertService.showSuccess({html: 'categoria eliminada exitosamente.'});
              }
            }, () => this.alertService.showError({html: 'ocurrio un error al eliminar la categoria.'})
          );
        }, () => this.alertService.showError({html: 'ocurrio un error al eliminar la categoria.'})
      );
    });*/
  }

  deleteCategoryArray(categories, id) {
    for (let i = 0; i < categories.length; i++) {
      categories[i].id === id ? categories.splice(i, 1) : '';
    }
  }

  closeModal() {
    this.modal.close();
  }

  submit(form) {
    /*if (this.type === 'crear') {
      this.categoryService.postCategory({
        'description': form.value.description,
        'idBranch': this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'),
        'imageCache': null,
        'imageName': null,
        'imageUrl': null,
        'name': form.value.name,
        'type': 'ninguno'
      }).subscribe(
        resCategory => {
          this.alertService.showSuccess({text: `categoria creada exitosamente.`});
          this.categories.push(resCategory.body);
          this.closeModal();
        },
        err => this.alertService.showError({html: 'ocurrio un error al crear la categoria.'})
      );
    }
    if (this.type === 'editar') {
      this.categoryService.putCategory({
        'id': this.category.id,
        'description': form.value.description,
        'idBranch': this.branchService.getIdBranch() ? this.branchService.getIdBranch() : this.$localStorage.retrieve('branchId'),
        'imageCache': null,
        'imageName': null,
        'imageUrl': null,
        'name': form.value.name,
        'type': 'ninguno'
      }).subscribe(
        res => {
          this.alertService.showSuccess({text: `categoria modificada exitosamente.`});
          this.deleteCategoryArray(this.categories, this.category.id);
          this.categories.push(res.body);
          this.closeModal();
        },
        err => this.alertService.showError({html: 'ocurrio un error al editar la categoria.'})
      );
    }
    this.activeModal.close();*/
  }
}
