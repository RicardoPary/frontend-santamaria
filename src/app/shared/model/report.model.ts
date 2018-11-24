export class ReportProduct {
  idBranch: number;
  fromDate = this.getDateFilter((new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1)));
  toDate = this.getDateFilter(new Date());

  getDateFilter(date: any) {
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
}

export class ReportSale {
  idBranch: number;
  product = '';
  user = '';
  fromDate = this.getDateFilter((new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1)));
  toDate = this.getDateFilter(new Date());

  getDateFilter(date: any) {
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
}

export class ReportUser {
  idBranch: number;
  orderNumber = '';
  fromDate = this.getDateFilter((new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1)));
  toDate = this.getDateFilter(new Date());

  getDateFilter(date: any) {
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
}

export class ReportProductFilter {
  size = 10;
  page = 0;
  sort = null;
  reportProduct: ReportProduct = new ReportProduct();
}

export class ReportSaleFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  reportSale: ReportSale = new ReportSale();
}

export class ReportUserFilter {
  size = 10;
  page = 0;
  sort = ['id,desc'];
  reportUser: ReportUser = new ReportUser();
}
