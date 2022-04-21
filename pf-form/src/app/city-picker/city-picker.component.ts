import {Component, OnInit} from '@angular/core';
import {Village} from '../@core/shared/model/village.model';
import {Area} from '../@core/shared/model/area.model';
import {City} from '../@core/shared/model/city.model';
import {COMPONENT_AIO} from '../@core/shared/routing/aio.path';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-city-picker',
    templateUrl: './city-picker.component.html',
    styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent implements OnInit {

    rootUrl = '/city_picker';
    cityList: Array<Village> = [];
    areaList: Array<Area> = [];
    villageList: Array<Village> = [];
    selectedCity: City = new City();
    selectedArea: Area = new Area();
    selectedVillage: Village = new Village();

    constructor(protected router: Router, private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get(this.rootUrl + '/getAll').subscribe((res: any) => {
            this.cityList = res;
        });
    }

    changCity(event: any) {
        this.http.post(this.rootUrl + '/getByHsnCd',
            this.selectedCity).subscribe((res: any) => {
            this.areaList = res;
        });
    }

    changeArea() {
        this.http.post(this.rootUrl + '/getVillages',
            this.selectedArea).subscribe((res: any) => {
            this.villageList = res;
        });
    }

    changeVillage() {

    }

    goMain() {
        this.router.navigate(['/' + COMPONENT_AIO.MAIN]);
    }
}
