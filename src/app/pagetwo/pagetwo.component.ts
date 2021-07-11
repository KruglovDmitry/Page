import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagetwo',
  templateUrl: './pagetwo.component.html',
  styleUrls: ['./pagetwo.component.css']
})
export class PagetwoComponent implements OnInit {

  private url = 'http://api.tvmaze.com/shows';
  title = "";
  from = "";
  to = "";
  showlist:any = [];
  viewlist: any = [];
  private subscription: any;

  constructor(private http: HttpClient) {  
  }

  ngOnInit() {
    this.title = localStorage.getItem('title_second') || "";
    this.from = localStorage.getItem('from_second') || "";
    this.to = localStorage.getItem('to_second') || "";
    this.subscription = this.http.get(this.url).subscribe(
      responce => 
      { 
      this.showlist = responce;
      this.viewlist = this.showlist;
      if (this.title != "") this.byName();
      if (this.from != "") this.byDate();
      if (this.to != "") this.byDate();
    });
  }

  byName() {
    let filterlist = [];
    for (let item of this.showlist) {
      let currentName = item.name.toLowerCase();
      if (currentName.includes(this.title.toLowerCase())) filterlist.push(item);
    }
    this.viewlist = filterlist;
    localStorage.setItem('title_second', this.title);
    this.from = "";
    this.to = "";
    localStorage.removeItem('from_second');
    localStorage.removeItem('to_second');
  }

  byDate() {
    let filterlist = [];
    let fromdate = new Date(parseInt(this.from.slice(0, 4)), parseInt(this.from.slice(6, 7)), parseInt(this.from.slice(9, 10)));
    let todate = new Date(parseInt(this.to.slice(0, 4)), parseInt(this.to.slice(6, 7)), parseInt(this.to.slice(9, 10)));

    for (let item of this.showlist) {

      let current = item.premiered;
      let currentdate = new Date(parseInt(current.slice(0, 4)), parseInt(current.slice(6, 7)), parseInt(current.slice(9, 10)));

      if ((this.to != "") && (this.from != "") && (fromdate < currentdate) && (currentdate < todate)) filterlist.push(item);
      if ((this.from != "") && (this.to == "") && (fromdate < currentdate)) filterlist.push(item);
      if ((this.from == "") && (this.to != "") && (currentdate < todate)) filterlist.push(item);
    }

    this.viewlist = filterlist;
    localStorage.setItem('from_second', this.from);
    localStorage.setItem('to_second', this.to);
    this.title = "";
    localStorage.removeItem('title_second');
  }

  reset() {
    this.title = "";
    this.from = "";
    this.to = "";
    localStorage.removeItem('title_second');
    localStorage.removeItem('from_second');
    localStorage.removeItem('to_second');
    this.viewlist = this.showlist;
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
