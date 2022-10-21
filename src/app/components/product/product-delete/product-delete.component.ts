import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if (!id) {
      id = ""
    }
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })

  }

  deleteProduct(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if (!id) {
      id = ""
    }
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso!")
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
