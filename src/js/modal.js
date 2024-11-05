import storageService from './services/storage';
import { refs } from './refs';



// resp:
// {
//   "_id": "64f389465ae26083f39b17a4",
//   "bodyPart": "waist",
//   "equipment": "body weight",
//   "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0003.gif",
//   "name": "air bike",
//   "target": "abs",
//   "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
//   "rating": 4.33,
//   "burnedCalories": 312,
//   "time": 3,
//   "popularity": 4
// }


// template for markup render
<div class="modal-info">
  <img src="" alt="" srcset="" />
  <div class="modal-info-box">
    <h2 class="exercise-title"></h2>
    <div class="exercise-rating">Rating</div>
    <ul class="exercise-set">
      <li class="exercise-set-item">
        <h3 class="item-title">
          <p class="item-description"></p>
        </h3>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">
          <p class="item-description"></p>
        </h3>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">
          <p class="item-description"></p>
        </h3>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">
          <p class="item-description"></p>
        </h3>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">
          <p class="item-description"></p>
        </h3>
      </li>
    </ul>
    <p class="exercise-description"></p>
  </div>
  <button type="button" class="add-btn">
    Add to favorites
  </button>
  <button type="button" class="rate-btn">
    Give a rating
  </button>
</div>