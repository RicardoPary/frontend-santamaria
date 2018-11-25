import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BranchService} from '../../shared/services/branch.service';
import {ProductFilter} from '../../shared/models/product';
import {Subscription} from 'rxjs/index';

@Component({
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})

export class CategoryDetailsComponent implements OnInit, OnDestroy {

  date = new Date();

  products: any = [];
  totalProducts: number;
  pageSize: number;
  page: number;
  subscriptionBranchService: Subscription = new Subscription();
  subscriptionTable: Subscription;
  subscriptionProductService: Subscription;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private branchService: BranchService,
              private modalService: NgbModal,
              private router: Router) {

    this.subscriptionBranchService = this.branchService.currentIdBranch().subscribe(
      idBranch => {
        if (parseFloat(idBranch) !== parseFloat(this.route.snapshot.params.idBranch)) {
          this.router.navigate(['pages/category']);
        }
      });


    this.subscriptionProductService = this.productService.currentProductFilter().subscribe(
      productFilter => {
        if (productFilter) {
          this.pageSize = productFilter.size;
          this.page = productFilter.page;
          this.branchService.currentIdBranch().subscribe(
            idBranch => {
              if (idBranch) {
                productFilter.product.idBranch = idBranch;
                productFilter.product.idCategory = this.route.snapshot.params.idCategory;
                this.callService(productFilter);
              }
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionBranchService ? this.subscriptionBranchService.unsubscribe() : '';
    this.subscriptionTable ? this.subscriptionTable.unsubscribe() : '';
  }

  callService(productFilter: ProductFilter) {
    this.subscriptionTable = this.productService.getAllProductsByFilter(productFilter).subscribe(res => {
      this.totalProducts = parseFloat(res.headers.get('X-Total-Count'));
      this.products = res.body;
    });
  }

  submitSearch(form) {
    const filter = this.productService.getProductFilter();
    filter.product.name = form.value.nameFilter;
    filter.page = 0;
    this.productService.sendProductFilter(filter);
    this.page = 0;
  }
}
