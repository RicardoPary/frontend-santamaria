export class InvoiceDetail {
  constructor (
    public concept: string= '',
    public currency: string= '',
    public key: string= '',
    public quantity: number= 1,
    public subtotal: string= '',
    public unitPrice: number= null
  ) {
  }
}
