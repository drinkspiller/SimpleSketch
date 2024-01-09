import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
export declare class AppComponent implements OnInit {
    private readonly window;
    private readonly isDebug;
    protected readonly isDebug$: Observable<boolean>;
    ngOnInit(): void;
}
