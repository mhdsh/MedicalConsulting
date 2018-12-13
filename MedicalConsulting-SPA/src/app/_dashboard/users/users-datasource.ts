import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

// TODO: Replace this with your own data model type
export interface UsersItem {
  title: string;
  id: number;
  excerpt: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UsersItem[] = [
  {id: 1, title: 'Hydrogen', excerpt: ''},
  {id: 2, title: 'Helium', excerpt: ''},
  {id: 3, title: 'Lithium', excerpt: ''},
  {id: 4, title: 'Beryllium', excerpt: ''},
  {id: 5, title: 'Boron', excerpt: ''},
  {id: 6, title: 'Carbon', excerpt: ''},
  {id: 7, title: 'Nitrogen', excerpt: ''},
  {id: 8, title: 'Oxygen', excerpt: ''},
  {id: 9, title: 'Fluorine', excerpt: ''},
  {id: 10, title: 'Neon', excerpt: ''},
  {id: 11, title: 'Sodium', excerpt: ''},
  {id: 12, title: 'Magnesium', excerpt: ''},
  {id: 13, title: 'Aluminum', excerpt: ''},
  {id: 14, title: 'Silicon', excerpt: ''},
  {id: 15, title: 'Phosphorus', excerpt: ''},
  {id: 16, title: 'Sulfur', excerpt: ''},
  {id: 17, title: 'Chlorine', excerpt: ''},
  {id: 18, title: 'Argon', excerpt: ''},
  {id: 19, title: 'Potassium', excerpt: ''},
  {id: 20, title: 'Calcium', excerpt: ''},
];

/**
 * Data source for the Users view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersDataSource extends DataSource<User> {
  data: User[];

  constructor(private paginator: MatPaginator, private sort: MatSort,
    private userService: UserService, private router: ActivatedRoute) {
    super();
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    this.loadUsers();
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'username': return compare(a.username, b.username, isAsc);
        case 'created': return compare(a.created, b.created, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  loadUsers() {
    this.router.data.subscribe(data => {
      this.data = data['users'];
    });
  }
}

/** Simple sort comparator for example ID/Title columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
