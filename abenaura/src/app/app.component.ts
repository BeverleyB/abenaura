import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  @ViewChild('stickyMenu') menuElement: ElementRef;

  public menuPosition: any;
  public sticky: boolean = false;
  public title = 'abenaura';

  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  public scrollTo(index: HTMLElement) {
    let menuHeight = 190;

    if (window.innerWidth > 768) {
      menuHeight = 240;
    }
    
    if (window.innerWidth > 992) {
      menuHeight = 300;
    }

    let elementPosition = index.getBoundingClientRect().top + document.documentElement.scrollTop;
    window.scrollTo({top: elementPosition - menuHeight, left: 0, behavior: 'smooth'});
  }
}

