import { Product, iProduct } from '../classes';

@Component({
	selector: 'edit-product',
	template:`
		<h2>Update Product</h2>
			<div class="list-group">
				<span *ngIf="products">
					<a class="list-group-item" (click)="setChosenProduct(product);" *ngFor="let product of products | find:{key:'name', value:search}">
						{{product.name}}	 
						<span>$</span>
						{{product.cost}} 
						<span>X</span> 
						{{product.amount}}
					</a>
				</span>
			</div>
	`
})

export class EditProductComponent { 
	products:Product[] = null;
	chosenProduct:Product = null;
	
	
	ngOnInit() {
		this.productService
			.getProducts()
			.subscribe((products:Product[])=>{
				this.products = products;
			})
	}
	}
	}
	
}