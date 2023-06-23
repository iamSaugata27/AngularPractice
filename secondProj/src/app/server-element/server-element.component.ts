import { AfterContentInit, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterViewInit, OnDestroy {

  @Input('srvElement') element: { type: string, name: string, content: string } = { type: '', content: '', name: '' };
  @Input() name!: string;
  @ViewChild('heading', { static: true }) header!: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph!: ElementRef;
  constructor() {
    console.log("Constructor called!")
  }

  ngOnInit(): void {
    console.log("ngOnInit called!")
    console.log("Text Content is: ", this.header.nativeElement.textContent);
    console.log("Text Content of paragraph is: ", this.paragraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges called!")
    console.log(changes)
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called!")
    console.log("Text Content of paragraph is: ", this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!")
    console.log("Text Content is: ", this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!")
  }
}
