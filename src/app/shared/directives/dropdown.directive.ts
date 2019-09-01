import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') openDropDown= false;

  constructor() { }

  @HostListener('click' , ['$event']) toggleDropdown(event: Event) {
    this.openDropDown = !this.openDropDown;
  }

}
