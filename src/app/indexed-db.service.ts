// src/app/indexed-db.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface AppDB extends DBSchema {
  randomData: {
    key: string;
    value: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<AppDB>> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if we're in the browser
    if (isPlatformBrowser(this.platformId) && typeof indexedDB !== 'undefined') {
      this.dbPromise = openDB<AppDB>('my-database', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('randomData')) {
            db.createObjectStore('randomData', { keyPath: 'key' });
          }
        },
      });
    } else {
      console.warn('IndexedDB is not available in this environment.');
    }
  }

  async addData(key: string, value: any): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    await db.put('randomData', { key, value });
    console.log('Data added:', { key, value });
  }

  async getData(key: string): Promise<any | undefined> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    return db.get('randomData', key);
  }

  async deleteData(key: string): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    await db.delete('randomData', key);
    console.log('Data deleted:', key);
  }

  async getAllData(): Promise<any[]> {
    if (!this.dbPromise) return [];
    const db = await this.dbPromise;
    return db.getAll('randomData');
  }
}
