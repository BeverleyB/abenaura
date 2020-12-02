import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  @ViewChild('stickyMenu') menuElement: ElementRef;

  public menuPosition: any;
  public sticky: boolean = false;
  public title = 'abenaura';

  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
    this.ViewportWidth();
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
    let menuHeight = 120;

    let elementPosition = index.getBoundingClientRect().top + document.documentElement.scrollTop;
    window.scrollTo({top: elementPosition - menuHeight, left: 0, behavior: 'smooth'});
  }

  public ViewportWidth() {
    if (window.innerWidth < 992) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }

  public goDown() {
    window.scrollTo({top: this.menuPosition, left: 0, behavior: 'smooth'});
  }
}
