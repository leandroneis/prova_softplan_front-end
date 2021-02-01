import {Router} from '@angular/router';
import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

import {LogoutService} from './../../seguranca/logout.service';
import {ErrorHandlerService} from './../error-handler.service';
import {AuthService} from './../../seguranca/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    exibindoMenu = false;
    isFocusInsideComponent = false;


    constructor(
        public auth: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    logout() {
        this.logoutService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    @HostListener('click')
    clickInside() {
        if (!this.isFocusInsideComponent && this.exibindoMenu) {
            this.isFocusInsideComponent = false;
            this.exibindoMenu = false;
        } else {
            this.isFocusInsideComponent = true;
            this.exibindoMenu = true;
        }

    }

    @HostListener('document:click')
    clickout() {
        if (!this.isFocusInsideComponent && this.exibindoMenu) {
            // do the heavy process

            this.exibindoMenu = false;
        }
        this.isFocusInsideComponent = false;
    }

}
