import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  catDetail!: FormGroup;
  catObj: Category = new Category();
  catList: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private catService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();

    this.catDetail = this.formBuilder.group({
      id: [''],
      CatName: [''],
      SubCat: [''],
      SubCatDesc: [''],
    });
  }

  addCategory() {
    console.log(this.catDetail);
    this.catObj.id = this.catDetail.value.id;
    this.catObj.CatName = this.catDetail.value.CatName;
    this.catObj.SubCat = this.catDetail.value.SubCat;
    this.catObj.SubCatDesc = this.catDetail.value.SubCatDesc;

    this.catService.addCategory(this.catObj).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllCategory();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getAllCategory() {
    this.catService.getAllCategory().subscribe(
      (res: any) => {
        this.catList = res;
      },
      (err: any) => {
        console.log('error while fetching data.');
      }
    );
  }

  editCategory(cat: Category) {
    this.catDetail.controls['id'].setValue(cat.id);
    this.catDetail.controls['CatName'].setValue(cat.CatName);
    this.catDetail.controls['SubCat'].setValue(cat.SubCat);
    this.catDetail.controls['SubCatDesc'].setValue(cat.SubCatDesc);
  }

  updateCategory() {
    this.catObj.id = this.catDetail.value.id;
    this.catObj.CatName = this.catDetail.value.CatName;
    this.catObj.SubCat = this.catDetail.value.SubCat;
    this.catObj.SubCatDesc = this.catDetail.value.SubCatDesc;

    this.catService.updateCategory(this.catObj).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllCategory();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteCategory(cat: Category) {
    this.catService.deleteCategory(cat).subscribe(
      (res: any) => {
        console.log(res);
        alert('Category deleted successfully');
        this.getAllCategory();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
