import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  // title: any;
  // thumbnailUrl: any;
  // salePrice: any;
  // regularPrice: any;
  quantity: number = 1;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private util: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.customerService.getProduct(id).subscribe((response) => {
      this.product = response;
      // this.title = response.title;
      // this.thumbnailUrl = response.thumbnailUrl;
      // this.salePrice = response.salePrice;
      // this.regularPrice = response.regularPrice;
      // this.regularPrice = response.category;
      // this.regularPrice = response.storeName;
    });
  }

  quantityChange(decrease: boolean): void {
    if (decrease && this.quantity > 1) {
      this.quantity--;
    } else if (!decrease) {
      this.quantity++;
    }
  }

  addToCart() {
    let cartItem: CartItem = {
      customerId: this.customerService.getCustomer().id,
      productId: this.product.id,
      sellerId: this.product.sellerId,
      storeName: this.product.storeName,
      productName: this.product.title,
      productThumbnailUrl: this.product.thumbnailUrl,
      productUnitPrice: this.product.salePrice,
      productQuantity: this.quantity,
      subTotal: this.product.salePrice * this.quantity,
    };
    this.customerService.addToCart(cartItem).subscribe((response) => {
      this.util.toastify(response != null, "Added to cart");
      this.customerService.toUpdateCart();
    });
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['cart'])
  }
}
