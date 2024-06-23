import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewscardComponent } from './newscard/newscard.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';

export type newsType = {
  source: {
    id: string | number | null;
    name: string | null;
  };
  title: string;
  description: string;
  url: string;
  author:string | null;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

@Component({
  selector: 'app-newscontainer',
  standalone: true,
  templateUrl: './newscontainer.component.html',
  styleUrl: './newscontainer.component.css',
  imports: [NewscardComponent, CommonModule,InfiniteScrollDirective],
})
export class NewscontainerComponent implements OnInit,OnChanges {
  constructor(private http: HttpClient) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['category']){
      this.page = 1
      this.articles = []
      this.getNews(changes['category'].currentValue)
    }
    
    
    // if(changes['category'].currentValue){
  //     // this.getNews(changes['category'].currentValue)
  //     this.page = 1
      
    // }
    console.debug("Value Changed",changes)
  }

  @Input() bgMode = '';
  @Input() category = '';

  pageSize = 8;
  page = 1;
  isError=false;
  errorMessage="";
  isLoading = false;
  totalArticles = 1 ;

  API_KEy: string = '0eacd250d5f94316a9b4dbeb2ace698c';

  // articles:newsType[] = [
  //   {
  //     source: {
  //       id: null,
  //       name: "BBC News"
  //     },
  //     author: null,
  //     title: "Fourth Tory official reportedly investigated for election bets - BBC.com",
  //     description: "A fourth Tory is being investigated for allegedly placing dozens of bets on the general election date.",
  //     url: "https://www.bbc.com/news/articles/c511nv3pjd6o",
  //     urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/edb3/live/32606d10-30ec-11ef-90be-b75b34b0bbb2.jpg",
  //     publishedAt: "2024-06-23T06:16:44Z",
  //     content: "By Helen Catt, Political correspondent  Adam Durbin, BBC News\r\nA fourth Conservative is reportedly being looked into by the Gambling Commission over bets allegedly placed on the date of the general e… [+4522 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NDTV News"
  //     },
  //     author: null,
  //     title: "There's A 72% Chance That An Asteroid May Hit Earth On This Exact Day - NDTV",
  //     description: "NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News",
  //     url: "https://www.ndtv.com/news",
  //     urlToImage: "https://cdn.ndtv.com/common/images/ogndtv.png",
  //     publishedAt: "2024-06-23T05:29:57Z",
  //     content: null
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "YouTube"
  //     },
  //     author: null,
  //     title: "Cyber attacks stall business at car dealerships nationwide - NBC News",
  //     description: "Thousands of car dealers are reeling from cyber attacks that targeted software used for conducting business. The incidents are slowing sales and raising new ...",
  //     url: "https://www.youtube.com/watch?v=WhOH5emalG0",
  //     urlToImage: "https://i.ytimg.com/vi/WhOH5emalG0/maxresdefault.jpg",
  //     publishedAt: "2024-06-23T03:00:21Z",
  //     content: null
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "[Removed]"
  //     },
  //     author: null,
  //     title: "[Removed]",
  //     description: "[Removed]",
  //     url: "https://removed.com",
  //     urlToImage: null,
  //     publishedAt: "1970-01-01T00:00:00Z",
  //     content: "[Removed]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "WFLA"
  //     },
  //     author: "Sara Filips",
  //     title: "Human case of dengue fever from mosquito bite confirmed in Hillsborough County - WFLA",
  //     description: "The Florida Department of Health in Hillsborough County has confirmed one case of locally acquired dengue fever caused by a mosquito bite.",
  //     url: "https://www.wfla.com/news/hillsborough-county/human-case-of-dengue-fever-from-mosquito-bite-confirmed-in-hillsborough-county/",
  //     urlToImage: "https://www.wfla.com/wp-content/uploads/sites/71/2023/08/malariamosquito_082123ap.jpg?w=1280",
  //     publishedAt: "2024-06-23T02:07:44Z",
  //     content: "HILLSBOROUGH COUNTY, Fla. (WFLA) The Florida Department of Health in Hillsborough County has confirmed one case of locally acquired dengue fever caused by a mosquito bite. \r\nOfficials are conducting … [+361 chars]"
  //   },
  //   {
  //     source: {
  //       id: "usa-today",
  //       name: "USA Today"
  //     },
  //     author: "Jon Hoefling, Erick Smith, Jesse Yomtov, Nicole Poell",
  //     title: "College World Series live updates: Texas A&M has breakout third inning, leads Tennessee - USA TODAY",
  //     description: "SEC rivals Tennessee and Texas A&M clash in Game 1 of the College World Series championship series. Follow along with updates from Saturday's game.",
  //     url: "https://www.usatoday.com/story/sports/college/baseball/2024/06/22/college-world-series-tennessee-texas-am-live-updates-highlights/74169934007/",
  //     urlToImage: "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/06/23/USAT/74184397007-slide.jpg?crop=2907,1635,x409,y165&width=2907&height=1635&format=pjpg&auto=webp",
  //     publishedAt: "2024-06-23T02:03:45Z",
  //     content: "After more than 100 games in the NCAA baseball tournament and more than a week at the College World Series in Nebraska, there are two teams left standing. And it's no surprise it's two teams from the… [+13793 chars]"
  //   },
  //   {
  //     source: {
  //       id: "cbs-news",
  //       name: "CBS News"
  //     },
  //     author: null,
  //     title: "Trump backs Louisiana law requiring Ten Commandments in schools in address to influential evangelicals - CBS News",
  //     description: "Louisiana this week passed a controversial law requiring the Ten Commandments be displayed in every public school classroom in the state.",
  //     url: "https://www.cbsnews.com/news/trump-supports-louisiana-ten-commandments-law-in-schools-evangelicals/",
  //     urlToImage: "https://assets3.cbsnewsstatic.com/hub/i/r/2024/06/22/5171f2d0-4b4b-4455-98cf-fd31c24596f9/thumbnail/1200x630/576971f907cd67432966f5a5811d2418/gettyimages-2158205597.jpg?v=cb1f2643a8816828741cfb3a3fb2d931",
  //     publishedAt: "2024-06-23T01:09:45Z",
  //     content: "Former President Donald Trump told a group of evangelicals they \"cannot afford to sit on the sidelines\" of the 2024 election, imploring them at one point to \"go and vote, Christians, please!\"\r\n Trump… [+7963 chars]"
  //   },
  //   {
  //     source: {
  //       id: "cnn",
  //       name: "CNN"
  //     },
  //     author: "Pauline Lockwood, Maija-Liisa Ehlinger",
  //     title: "‘They saved their whole lives for this’: American woman’s heartbreak as parents die on Hajj - CNN",
  //     description: "What was supposed to be the trip of a lifetime turned tragic this week when Saida Wurie learned her parents were among the hundreds of pilgrims who have died amid extreme temperatures in Saudi Arabia.",
  //     url: "https://www.cnn.com/2024/06/22/middleeast/american-deaths-hajj-heat-intl-latam/index.html",
  //     urlToImage: "https://media.cnn.com/api/v1/images/stellar/prod/hajj1.jpeg?c=16x9&q=w_800,c_fill",
  //     publishedAt: "2024-06-23T00:51:00Z",
  //     content: "Saida Wurie said it was her parents lifelong dream to participate in Hajj, the religious pilgrimage that brings Muslims from around the world to Saudi Arabia each year.\r\nTheyd spent $23,000 on an all… [+5156 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NBC10 Boston"
  //     },
  //     author: "Kaitlin McKinley Becker, Sydney Welch",
  //     title: "Increased tornado threat Sunday in New England - NBC Boston",
  //     description: "For parts of central New England, there is a 10% tornado threat within 25 miles of a point -- the highest tornado risk for the region in six years, according to…",
  //     url: "https://www.nbcboston.com/news/local/increased-tornado-threat-sunday-in-new-england/3407080/",
  //     urlToImage: "https://media.nbcboston.com/2024/06/Tornado-Threat-DAY-2.png?resize=1200%2C675&quality=85&strip=all",
  //     publishedAt: "2024-06-23T00:39:13Z",
  //     content: "Widespread showers and storms rolled through New England Saturday, with severe thunderstorm warnings in several states, and a tornado warning in Connecticut. Still, there is potential for more signif… [+4089 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Yahoo Entertainment"
  //     },
  //     author: "Ian Casselberry",
  //     title: "Liberty off to best start in franchise history as Breanna Stewart scores 33 points to lead win over Sparks - Yahoo Sports",
  //     description: "Breanna Stewart scored 33 points as the New York Liberty improved their record to a franchise-best 14–3.",
  //     url: "https://sports.yahoo.com/liberty-off-to-best-start-in-franchise-history-as-breanna-stewart-scores-33-points-to-lead-win-over-sparks-002703256.html",
  //     urlToImage: "https://s.yimg.com/ny/api/res/1.2/PQKwkPlWHY..9L2JnnWxvA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ0Ny43MzMzMzMzMzMzMzM2/https://s.yimg.com/os/creatr-uploaded-images/2024-06/8987df40-1165-11ee-bfe7-c16c452c8bb4",
  //     publishedAt: "2024-06-23T00:27:03Z",
  //     content: "Breanna Stewart and the New York Liberty are off to the best start in franchise history.\r\nIn a battle between the top two teams in the WNBA, the Liberty defeated the Las Vegas Aces, 99-61, on Saturda… [+1723 chars]"
  //   }
  // ];
  
  articles:newsType[] = []
  


  getNews(category:string){
    this.isLoading = true;
    const res = this.http.get(`https://newsapi.org/v2/top-headlines?apiKey=${this.API_KEy}&country=in&category=${category}&page=${this.page}&pageSize=${this.pageSize}`).subscribe((data:any)=>{
      if(data.status == "ok"){
        this.articles.push(...data.articles)
        this.totalArticles = data.totalResults
      }else{
        this.isError = true;
        this.errorMessage = data.message || "Internal Server Error."
      }
      console.debug("response",data)
    })
    this.isLoading = false
    this.page += 1
  }

  ngOnInit(): void {
    this.getNews("general")
  }

  scrollDown(){
    console.debug("Scroll Donw")
  }
}
