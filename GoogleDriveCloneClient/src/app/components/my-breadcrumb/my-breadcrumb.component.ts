import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Breadcrumb, IBreadcrumb } from 'src/app/models/breadcrumb';
import { PushDataBreadcrumbService } from 'src/app/_services/push-data-breadcrumb.service';

@Component({
  selector: 'app-my-breadcrumb',
  templateUrl: './my-breadcrumb.component.html',
  styleUrls: ['./my-breadcrumb.component.css']
})
export class MyBreadcrumbComponent implements OnInit {
  @Output() getItem = new EventEmitter();
  data: IBreadcrumb[] = [
    {id:'root', name:'My drive', fullPath:""}
  ];

  selectedItem = new Breadcrumb('', null);
  
  constructor(private breadcrumb: PushDataBreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb.dataBreadcrumb$.subscribe(data=>{
      const item = this.data.some(x=>x.fullPath === data.fullPath);
      if(!item)
        this.data.push(data);
    })
  }

  onSelect(item: IBreadcrumb){
    this.selectedItem = item;
    let indexStart = this.data.findIndex(x=>x.id === item.id);
    if(indexStart !== -1){
      const indexEnd = this.data.length -1;
      //xoa tu sau vi tri indexStart
      this.data.splice(++indexStart, indexEnd - indexStart + 1);
      this.getItem.emit(item);//push to home component
    }
  }

}
