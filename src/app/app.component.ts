import { Component , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexedDbService } from './indexed-db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'fetchEventPwa';
  randomJsonData = {
    id: Math.random().toString(36).substring(2),
    name: 'Random User',
    age: Math.floor(Math.random() * 100),
    email: 'randomuser@example.com',
  };

  constructor(private indexedDbService: IndexedDbService) {}

  async ngOnInit() {
    // Store random JSON data in IndexedDB
    await this.indexedDbService.addData(this.randomJsonData.id, this.randomJsonData);

    // Retrieve all data and log it
    const allData = await this.indexedDbService.getAllData();
    console.log('All data from IndexedDB:', allData);
  }
}
