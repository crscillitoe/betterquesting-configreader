import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})
export class MainDisplayComponent implements OnInit {

  model: any;
  toDisplay: any;

  constructor(private http: HttpClient) { }

  display(index) {
    this.toDisplay = index;
  }

  ngOnInit() { 
    this.toDisplay = -1;

    this.http.get('assets/DefaultQuests.json') 
      .subscribe((data) => {
        this.model = [];

        for(const key in Object.keys(data['questLines:9'])) {
          var temp = (data['questLines:9'])[key + ':10'];
          var ageName = (temp['properties:10']['betterquesting:10'])['name:8'];  

          var descriptions = [];
          for(const key2 in Object.keys(temp['quests:9'])) {
            var id = temp['quests:9'][key2 + ':10']['id:3'];
            var desc = data['questDatabase:9'][id + ':10']['properties:10']['betterquesting:10']['desc:8'];

            descriptions.push(desc);
          }

          this.model.push({ageName, descriptions});
        }
      });
  }

}
