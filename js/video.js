// framleiðir villuskilaboð ef axaj klikkar eða önnur villa í ajax kalli.
function errMsg() {
  const main = document.querySelector('main');
  const error = document.createElement('div');
  error.classList.add('error');
  error.appendChild(document.createTextNode('Gat ekki hlaðið gögnum'));
  main.appendChild(error);
}

// ajax kall á url og senda niðursöðu til video hlut
function getData(url, video) {
  const json = new XMLHttpRequest();
  json.open('GET', url, true);
  json.onload = () => {
    if (json.status < 400 && json.status >= 200) {
      video.run(JSON.parse(json.response));
    } else {
      console.error('villa', json);
      errMsg();
    }
  };

  json.onerror = () => {
    errMsg();
  };

  json.send();
}

class Video {
  // smiður
  constructor() {
    // local .json file
    this.API_URL = '/js/videos.json';
    getData(this.API_URL, this);
  }

  // keyrsla
  run(data) {
    this.data = data;
    this.process(this.data);
  }

  // vinna úr gögnum
  process(data) {
    const { videos } = data;
    const { categories } = data;
    const sorted = this.sort(videos, categories);
    this.make(sorted.nyleg, 'Nýleg_myndbönd');
    this.make(sorted.kennslu, 'Kennslumyndbönd');
    this.make(sorted.gaman, 'Skemmtimyndbönd');
  }

  // búa til grind
  make(cat, title) {
    const main = document.querySelector('main');

    const section = document.createElement('nav');
    const list = document.createElement('ul');
    list.classList.add('video');
    list.classList.add('row');

    const header = document.createElement('h2');
    header.setAttribute('class', 'header header--heading2');

    section.appendChild(header);
    section.appendChild(list);
    header.appendChild(document.createTextNode(title.replace(/_+/g, ' ')));

    // fyrir alla flokka, búa til flokk með movie(x);
    Object.values(cat).forEach(x => list.appendChild(this.movie(x)));

    main.appendChild(section);
  }

  // búa til flokka með myndum
  movie(movie) {
    const container = document.createElement('li');
    container.classList.add('video__movie');
    this.makeGrid(container);

    const poster = document.createElement('a');
    poster.classList.add('video__poster');
    poster.setAttribute('href', `'player.html?id='${movie.id}`);

    const img = document.createElement('img');
    img.setAttribute('src', movie.poster);

    const length = document.createElement('div');
    length.classList.add('video__length');
    length.appendChild(document.createTextNode(this.timestamp(movie.duration)));

    const title = document.createElement('h2');
    title.classList.add('video__title');
    title.appendChild(document.createTextNode(movie.title));

    const date = document.createElement('p');
    date.classList.add('video__date');
    date.appendChild(document.createTextNode(this.toDate(movie.created)));

    const info = document.createElement('div');
    info.classList.add('video__info');

    // TODO: gera fall fyrir movie.created
    info.appendChild(title);
    info.appendChild(date);

    poster.appendChild(img);
    poster.appendChild(length);

    container.appendChild(poster);
    container.appendChild(info);

    return container;
  }

  // útfæra grind
  makeGrid(cont) {
    cont.classList.add('col');
    cont.classList.add('col-4');
    cont.classList.add('col-sm-6');
    cont.classList.add('col-mm-12');
  }

  // fá lengd myndbands
  timestamp(length) {
    const min = Math.floor(length / 60);
    const sec = length - (min * 60);

    if (sec < 10) {
      return `${min}:0${sec}`;
    }
    return `${min}:${sec}`;
  }

  // fá aldur á myndbandi
  toDate(date) {
    const made = new Date(date);
    const now = new Date();
    return this.dateHowLong(now - made);
  }

  // sníða framsetningu á aldri myndbands
  dateHowLong(time) {
    const secs = time / 1000;
    const year = Math.floor(secs / (365 * 24 * 60 * 60));
    const month = Math.floor(secs / (30 * 24 * 60 * 60));
    const week = Math.floor(secs / (7 * 24 * 60 * 60));
    const day = Math.floor(secs / (24 * 60 * 60));
    const hour = Math.floor(secs / (60 * 60));

    if (year >= 1) {
      if (year === 1) {
        return `Fyrir ${year} ári síðan`;
      }
      return `Fyrir ${year} árum síðan`;
    } else if (month >= 1) {
      if (month === 1) {
        return `Fyrir ${month} mánuði síðan`;
      }
      return `Fyrir ${month} mánuðum síðan`;
    } else if (week >= 1) {
      if (week === 1) {
        return `Fyrir ${week} viku síðan`;
      }
      return `Fyrir ${week} vikum síðan`;
    } else if (day >= 1) {
      if (day === 1) {
        return `Fyrir ${day} degi síðan`;
      }
      return `Fyrir ${day} dögum síðan`;
    }
    if (hour === 1) {
      return `Fyrir ${hour} klukkustund síðan`;
    }
    return `Fyrir ${hour} klukkustundum síðan`;
  }

  // flokka myndir í catagoríur
  sort(videos, cat) {
    // TODO: reyna koma þessu í forEach eða álíka
    const nyleg = videos.filter(categorie => cat[0].videos.includes(categorie.id));

    const kennslu = videos.filter(categorie => cat[1].videos.includes(categorie.id));

    const gaman = videos.filter(categorie => cat[2].videos.includes(categorie.id));

    return { nyleg, kennslu, gaman };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
});
