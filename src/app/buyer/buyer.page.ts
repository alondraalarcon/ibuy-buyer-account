import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownApiService } from '../api/dropdown-api.service';
import { BuyerService } from '../api/buyer.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dealer',
  templateUrl: './buyer.page.html',
  styleUrls: ['./buyer.page.scss']
})
export class BuyerPage implements OnInit {
  regions: any;
  countries: any;
  provinces: any;
  cities: any;
  barangays: any;
  categories: any;
  form: FormGroup;

  constructor(
    private dropdownApiService: DropdownApiService,
    private buyerService: BuyerService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      FName: new FormControl(null, [Validators.required]),
      MName: new FormControl(null, [Validators.required]),
      LName: new FormControl(null, [Validators.required]),
      Date_of_Birth: new FormControl(null, [Validators.required]),
      Add_StreetNo: new FormControl(null, [Validators.required]),
      Add_Street: new FormControl(null, [Validators.required]),
      Brgy_ID: new FormControl(null, [Validators.required]),
      City_ID: new FormControl(null, [Validators.required]),
      Province_ID: new FormControl(null, [Validators.required]),
      Region_ID: new FormControl(null, [Validators.required]),
      Country_ID: new FormControl(null, [Validators.required]),
      TelNo: new FormControl(null, [Validators.required]),
      Email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      )
    });

    this.getAllAPI();
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait, form is saving..'
    });
    loading.present();
    this.buyerService
      .addDealer(this.form.value)
      .pipe(take(1))
      .subscribe(async dealer => {
        this.getAllAPI();
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Dealer Information successfully saved!',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  onChangeCountry(countryId) {
    if (countryId) {
      this.dropdownApiService
        .getRegionByCountry(countryId.detail.value)
        .subscribe(data => {
          this.regions = data;
        });
    } else {
      this.regions = [];
    }
  }

  onChangeRegion(regionId) {
    if (regionId) {
      this.dropdownApiService
        .getProvinceByRegion(regionId.detail.value)
        .subscribe(data => {
          this.provinces = data;
        });
    } else {
      this.regions = [];
    }
  }

  onChangeProvince(provinceId) {
    if (provinceId) {
      this.dropdownApiService
        .getCitiesByProvince(provinceId.detail.value)
        .subscribe(data => {
          this.cities = data;
        });
    } else {
      this.cities = [];
    }
  }

  onChangeCity(cityId) {
    if (cityId) {
      this.dropdownApiService
        .getBarangayByCity(cityId.detail.value)
        .subscribe(data => {
          this.barangays = data;
        });
    } else {
      this.barangays = [];
    }
  }

  async getAllAPI() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait..'
    });
    loading.present();
    //all countries
    this.dropdownApiService.getAllCountries().subscribe(response => {
      this.countries = response;
      loading.dismiss();
    });
  }
}
