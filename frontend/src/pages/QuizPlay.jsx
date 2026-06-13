import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const isDemo = () => !!localStorage.getItem('glp_demo_user');

const DEMO_QUIZZES_DATA = {
  // --- Group A (Class 1-3) ---
  dq_a_math: {
    _id: 'dq_a_math', title: 'Basic Counting & Addition', timeLimit: 300, xpReward: 50, grade: 2,
    questions: [
      { questionText: '1 + 1 = ?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: '1 and 1 make 2.', points: 10 },
      { questionText: '2 + 2 = ?', options: ['2', '4', '6', '8'], correctAnswer: 1, explanation: '2 and 2 make 4.', points: 10 },
      { questionText: '3 + 3 = ?', options: ['3', '5', '6', '9'], correctAnswer: 2, explanation: '3 and 3 make 6.', points: 10 },
      { questionText: '5 - 2 = ?', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: '5 minus 2 is 3.', points: 10 },
      { questionText: 'What number comes after 9?', options: ['8', '9', '10', '11'], correctAnswer: 2, explanation: '10 comes after 9.', points: 10 },
      { questionText: '4 + 1 = ?', options: ['3', '4', '5', '6'], correctAnswer: 2, explanation: '4 plus 1 is 5.', points: 10 },
      { questionText: 'Count the stars: ⭐⭐⭐', options: ['2 stars', '3 stars', '4 stars', '5 stars'], correctAnswer: 1, explanation: 'There are exactly 3 stars.', points: 10 },
      { questionText: '10 - 5 = ?', options: ['4', '5', '6', '10'], correctAnswer: 1, explanation: '10 minus 5 is 5.', points: 10 },
      { questionText: '6 + 2 = ?', options: ['7', '8', '9', '10'], correctAnswer: 1, explanation: '6 plus 2 is 8.', points: 10 },
      { questionText: 'Count the balls: ⚽⚽', options: ['1 ball', '2 balls', '3 balls', '4 balls'], correctAnswer: 1, explanation: 'There are exactly 2 balls.', points: 10 }
    ]
  },
  dq_a_sci: {
    _id: 'dq_a_sci', title: 'Living & Non-Living Things', timeLimit: 300, xpReward: 50, grade: 2,
    questions: [
      { questionText: 'Which animal barks?', options: ['Dog', 'Cat', 'Cow', 'Lion'], correctAnswer: 0, explanation: 'Dogs bark. Cats meow.', points: 10 },
      { questionText: 'What is the color of leaves?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 1, explanation: 'Leaves are green because of chlorophyll.', points: 10 },
      { questionText: 'Which of these is a living thing?', options: ['Stone', 'Cat', 'Car', 'Book'], correctAnswer: 1, explanation: 'A cat breathes, eats, and grows.', points: 10 },
      { questionText: 'The sun shines in the...?', options: ['Night', 'Day', 'Water', 'Cave'], correctAnswer: 1, explanation: 'The sun shines during the day.', points: 10 },
      { questionText: 'Which animal gives us milk?', options: ['Dog', 'Cat', 'Cow', 'Lion'], correctAnswer: 2, explanation: 'Cows give us milk.', points: 10 },
      { questionText: 'Where do fish live?', options: ['Air', 'Water', 'Land', 'Trees'], correctAnswer: 1, explanation: 'Fish breathe underwater and live in water.', points: 10 },
      { questionText: 'Which of these is a fruit?', options: ['Potato', 'Apple', 'Carrot', 'Onion'], correctAnswer: 1, explanation: 'An apple is a sweet fruit.', points: 10 },
      { questionText: 'We smell things with our...?', options: ['Eyes', 'Ears', 'Nose', 'Mouth'], correctAnswer: 2, explanation: 'We use our nose to smell.', points: 10 },
      { questionText: 'We hear sounds with our...?', options: ['Eyes', 'Ears', 'Nose', 'Hands'], correctAnswer: 1, explanation: 'We use our ears to listen.', points: 10 },
      { questionText: 'A baby cat is called a...?', options: ['Puppy', 'Kitten', 'Calf', 'Lamb'], correctAnswer: 1, explanation: 'A baby cat is called a kitten.', points: 10 }
    ]
  },
  dq_a_eng: {
    _id: 'dq_a_eng', title: 'Alphabet & Phonics', timeLimit: 300, xpReward: 50, grade: 2,
    questions: [
      { questionText: 'Which letter comes after C?', options: ['A', 'B', 'D', 'E'], correctAnswer: 2, explanation: 'D comes after C (A, B, C, D...)', points: 10 },
      { questionText: 'Find the missing letter: A, B, C, _, E', options: ['D', 'F', 'G', 'H'], correctAnswer: 0, explanation: 'D fills the blank.', points: 10 },
      { questionText: "What is the first letter of 'Apple'?", options: ['A', 'B', 'C', 'P'], correctAnswer: 0, explanation: 'A is for Apple.', points: 10 },
      { questionText: 'Which of these is a vowel?', options: ['B', 'C', 'D', 'E'], correctAnswer: 3, explanation: 'Vowels are A, E, I, O, U.', points: 10 },
      { questionText: "Choose the correct spelling of '1':", options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 0, explanation: 'One represents 1.', points: 10 },
      { questionText: "What is the plural of 'Book'?", options: ['Books', 'Bookes', 'Bookies', 'Book'], correctAnswer: 0, explanation: 'We add -s to make books plural.', points: 10 },
      { questionText: "What is the opposite of 'Hot'?", options: ['Cold', 'Warm', 'Ice', 'Fire'], correctAnswer: 0, explanation: 'Cold is the opposite of hot.', points: 10 },
      { questionText: "What is the first letter of 'Ball'?", options: ['A', 'B', 'C', 'D'], correctAnswer: 1, explanation: 'B is for Ball.', points: 10 },
      { questionText: "Choose the correct spelling of '2':", options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 1, explanation: 'Two represents 2.', points: 10 },
      { questionText: 'Which letter comes before Z?', options: ['W', 'X', 'Y', 'V'], correctAnswer: 2, explanation: 'Y is right before Z.', points: 10 }
    ]
  },
  dq_a_hin: {
    _id: 'dq_a_hin', title: 'हिंदी शब्द और शब्दावली', timeLimit: 300, xpReward: 50, grade: 2,
    questions: [
      { questionText: "'सेब' (Seb) को अंग्रेजी में क्या कहते हैं?", options: ['Apple', 'Banana', 'Mango', 'Grape'], correctAnswer: 0, explanation: 'सेब को अंग्रेजी में Apple कहते हैं।', points: 10 },
      { questionText: "'पानी' (Paani) को अंग्रेजी में क्या कहते हैं?", options: ['Milk', 'Water', 'Juice', 'Tea'], correctAnswer: 1, explanation: 'पानी को अंग्रेजी में Water कहते हैं।', points: 10 },
      { questionText: "'घर' (Ghar) को अंग्रेजी में क्या कहते हैं?", options: ['School', 'House', 'Garden', 'Park'], correctAnswer: 1, explanation: 'घर को अंग्रेजी में House कहते हैं।', points: 10 },
      { questionText: "'बिल्ली' (Billi) को अंग्रेजी में क्या कहते हैं?", options: ['Dog', 'Cat', 'Cow', 'Rat'], correctAnswer: 1, explanation: 'बिल्ली को अंग्रेजी में Cat कहते हैं।', points: 10 },
      { questionText: "'बड़ा' (Bada) का विलोम (उल्टा) शब्द क्या है?", options: ['छोटा', 'ऊँचा', 'लम्बा', 'पतला'], correctAnswer: 0, explanation: 'बड़ा का विलोम छोटा होता है।', points: 10 },
      { questionText: "'सूरज' (Suraj) को अंग्रेजी में क्या कहते हैं?", options: ['Moon', 'Sun', 'Star', 'Sky'], correctAnswer: 1, explanation: 'सूरज को अंग्रेजी में Sun कहते हैं।', points: 10 },
      { questionText: "'नमस्ते' (Namaste) को अंग्रेजी में क्या कहते हैं?", options: ['Good morning', 'Hello', 'Goodbye', 'Thank you'], correctAnswer: 1, explanation: 'नमस्ते को अंग्रेजी में Hello कहते हैं।', points: 10 },
      { questionText: "हिंदी स्वर 'अ' को अंग्रेजी में कैसे लिखते हैं?", options: ['A', 'Ka', 'Kha', 'Cha'], correctAnswer: 0, explanation: "'अ' को अंग्रेजी वर्णमाला में 'A' द्वारा दर्शाया जाता है।", points: 10 },
      { questionText: "'लाल' (Laal) रंग को अंग्रेजी में क्या कहते हैं?", options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 0, explanation: 'लाल रंग को अंग्रेजी में Red कहते हैं।', points: 10 },
      { questionText: "'किताब' (Kitaab) को अंग्रेजी में क्या कहते हैं?", options: ['Pen', 'Book', 'Pencil', 'Eraser'], correctAnswer: 1, explanation: 'किताब को अंग्रेजी में Book कहते हैं।', points: 10 }
    ]
  },
  dq_a_sst: {
    _id: 'dq_a_sst', title: 'My Family & Neighborhood', timeLimit: 300, xpReward: 50, grade: 2,
    questions: [
      { questionText: "Who is your father's brother?", options: ['Uncle', 'Grandfather', 'Mama', 'Brother'], correctAnswer: 0, explanation: 'Father\'s brother is Uncle.', points: 10 },
      { questionText: 'Where does a doctor work?', options: ['School', 'Hospital', 'Police Station', 'Farm'], correctAnswer: 1, explanation: 'Doctors work in hospitals.', points: 10 },
      { questionText: 'Who teaches students at school?', options: ['Doctor', 'Teacher', 'Farmer', 'Driver'], correctAnswer: 1, explanation: 'Teachers teach at school.', points: 10 },
      { questionText: 'Where do we go to play?', options: ['School', 'Park', 'Market', 'Office'], correctAnswer: 1, explanation: 'Parks are made for playing.', points: 10 },
      { questionText: 'Which vehicle runs on tracks?', options: ['Car', 'Bus', 'Train', 'Boat'], correctAnswer: 2, explanation: 'Trains run on tracks.', points: 10 },
      { questionText: 'Who flies an airplane?', options: ['Driver', 'Pilot', 'Captain', 'Sailor'], correctAnswer: 1, explanation: 'Pilots fly airplanes.', points: 10 },
      { questionText: 'We live in a country named...?', options: ['India', 'America', 'China', 'Japan'], correctAnswer: 0, explanation: 'Our country is India.', points: 10 },
      { questionText: 'How many colors are in the Indian national flag?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'India\'s flag has 3 main colors (Tricolor).', points: 10 },
      { questionText: 'Who grows crops for food?', options: ['Doctor', 'Teacher', 'Farmer', 'Cook'], correctAnswer: 2, explanation: 'Farmers grow food in fields.', points: 10 },
      { questionText: 'A house made of mud is called a...?', options: ['Kutcha house', 'Pucca house', 'Tent', 'Igloo'], correctAnswer: 0, explanation: 'Mud houses are Kutcha houses.', points: 10 }
    ]
  },

  // --- Group B (Class 4-6) ---
  dq_b_math: {
    _id: 'dq_b_math', title: 'Multiplication & Division', timeLimit: 300, xpReward: 60, grade: 5,
    questions: [
      { questionText: '5 × 6 = ?', options: ['11', '25', '30', '35'], correctAnswer: 2, explanation: '5 times 6 is 30.', points: 10 },
      { questionText: '24 ÷ 4 = ?', options: ['4', '6', '8', '12'], correctAnswer: 1, explanation: '24 divided by 4 is 6.', points: 10 },
      { questionText: 'What is 100 + 200?', options: ['150', '250', '300', '400'], correctAnswer: 2, explanation: '100 + 200 = 300.', points: 10 },
      { questionText: 'Which is greater: 1/2 or 1/4?', options: ['1/2', '1/4', 'They are equal', 'None'], correctAnswer: 0, explanation: '1/2 (half) is larger than 1/4 (quarter).', points: 10 },
      { questionText: '12 × 3 = ?', options: ['30', '32', '36', '40'], correctAnswer: 2, explanation: '12 times 3 is 36.', points: 10 },
      { questionText: 'A triangle has how many sides?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'Triangles have 3 sides.', points: 10 },
      { questionText: '50 - 15 = ?', options: ['30', '35', '40', '45'], correctAnswer: 1, explanation: '50 minus 15 is 35.', points: 10 },
      { questionText: '8 × 8 = ?', options: ['56', '60', '64', '72'], correctAnswer: 2, explanation: '8 times 8 is 64.', points: 10 },
      { questionText: 'What is half of 50?', options: ['20', '25', '30', '40'], correctAnswer: 1, explanation: '50 divided by 2 is 25.', points: 10 },
      { questionText: '90 ÷ 10 = ?', options: ['8', '9', '10', '90'], correctAnswer: 1, explanation: '90 divided by 10 is 9.', points: 10 }
    ]
  },
  dq_b_sci: {
    _id: 'dq_b_sci', title: 'Water Cycle & Climate', timeLimit: 300, xpReward: 60, grade: 5,
    questions: [
      { questionText: 'What is water turning to gas called?', options: ['Condensation', 'Evaporation', 'Precipitation', 'Freezing'], correctAnswer: 1, explanation: 'Evaporation is water becoming vapor.', points: 10 },
      { questionText: 'What is gas turning to liquid called?', options: ['Condensation', 'Evaporation', 'Precipitation', 'Freezing'], correctAnswer: 0, explanation: 'Condensation forms clouds.', points: 10 },
      { questionText: 'What is the green pigment in plants called?', options: ['Chlorophyll', 'Cytoplasm', 'Sap', 'Carotene'], correctAnswer: 0, explanation: 'Chlorophyll absorbs sunlight.', points: 10 },
      { questionText: 'Which gas do humans breathe in?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'], correctAnswer: 0, explanation: 'We need Oxygen to live.', points: 10 },
      { questionText: 'Earth revolves around the...?', options: ['Moon', 'Sun', 'Mars', 'Jupiter'], correctAnswer: 1, explanation: 'Earth revolves around the Sun.', points: 10 },
      { questionText: 'The Moon is a natural...?', options: ['Planet', 'Star', 'Satellite', 'Comet'], correctAnswer: 2, explanation: 'The Moon is Earth\'s natural satellite.', points: 10 },
      { questionText: 'What is the boiling point of water?', options: ['0°C', '50°C', '100°C', '200°C'], correctAnswer: 2, explanation: 'Water boils at 100°C.', points: 10 },
      { questionText: 'Ice is the solid state of...?', options: ['Air', 'Water', 'Oil', 'Rock'], correctAnswer: 1, explanation: 'Water freezes to solid ice.', points: 10 },
      { questionText: 'How many bones are in an adult human body?', options: ['106', '206', '306', '406'], correctAnswer: 1, explanation: 'Humans have 206 bones.', points: 10 },
      { questionText: 'The brain is a part of which system?', options: ['Nervous System', 'Digestive System', 'Circulatory System', 'Respiratory System'], correctAnswer: 0, explanation: 'Nervous system controls brain signals.', points: 10 }
    ]
  },
  dq_b_eng: {
    _id: 'dq_b_eng', title: 'English Nouns & Verbs', timeLimit: 300, xpReward: 60, grade: 5,
    questions: [
      { questionText: "Identify the Noun in: 'Rahul runs fast.'", options: ['Rahul', 'runs', 'fast', 'is'], correctAnswer: 0, explanation: 'Rahul is a naming word.', points: 10 },
      { questionText: "Identify the Verb in: 'She walks to school.'", options: ['She', 'walks', 'to', 'school'], correctAnswer: 1, explanation: 'walks is the action word.', points: 10 },
      { questionText: "Identify the Adjective in: 'This is a red ball.'", options: ['This', 'is', 'red', 'ball'], correctAnswer: 2, explanation: 'red describes the ball.', points: 10 },
      { questionText: "What is the plural of 'Child'?", options: ['Childs', 'Children', 'Childrens', 'Childes'], correctAnswer: 1, explanation: 'Children is irregular plural.', points: 10 },
      { questionText: "What is the past tense of 'Go'?", options: ['Goed', 'Going', 'Went', 'Gone'], correctAnswer: 2, explanation: 'went is past tense of go.', points: 10 },
      { questionText: "What is the opposite of 'Happy'?", options: ['Sad', 'Glad', 'Angry', 'Joyful'], correctAnswer: 0, explanation: 'Sad is opposite of happy.', points: 10 },
      { questionText: "Identify the Pronoun in: 'They are playing.'", options: ['They', 'are', 'playing', 'ball'], correctAnswer: 0, explanation: 'They replaces names.', points: 10 },
      { questionText: "Find the preposition in: 'The book is on the table.'", options: ['book', 'is', 'on', 'table'], correctAnswer: 2, explanation: 'on shows position.', points: 10 },
      { questionText: "What is the synonym of 'Large'?", options: ['Small', 'Big', 'Tiny', 'Short'], correctAnswer: 1, explanation: 'Big has same meaning as large.', points: 10 },
      { questionText: "Which is the correct spelling?", options: ['Recieve', 'Receive', 'Receve', 'Reciev'], correctAnswer: 1, explanation: 'Receive is correct.', points: 10 }
    ]
  },
  dq_b_hin: {
    _id: 'dq_b_hin', title: 'हिंदी व्याकरण बुनियादी बातें', timeLimit: 300, xpReward: 60, grade: 5,
    questions: [
      { questionText: "'रामपुर' (Rampur) किस प्रकार की संज्ञा है?", options: ['व्यक्तिवाचक संज्ञा (Proper Noun)', 'जातिवाचक संज्ञा (Common Noun)', 'समूहवाचक संज्ञा (Collective Noun)', 'भाववाचक संज्ञा (Abstract Noun)'], correctAnswer: 0, explanation: 'रामपुर एक विशेष स्थान का नाम है, इसलिए यह व्यक्तिवाचक संज्ञा है।', points: 10 },
      { questionText: "अंग्रेजी शब्द 'Pronoun' को हिंदी में क्या कहते हैं?", options: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'विशेषण'], correctAnswer: 1, explanation: 'Pronoun को हिंदी में सर्वनाम कहते हैं।', points: 10 },
      { questionText: "'श्याम पढ़ रहा है' वाक्य में संज्ञा शब्द कौन सा है?", options: ['श्याम', 'रहा', 'पढ़', 'है'], correctAnswer: 0, explanation: 'श्याम एक व्यक्ति का नाम है, इसलिए यह संज्ञा है।', points: 10 },
      { questionText: "'लड़का' (Ladka) का बहुवचन रूप क्या है?", options: ['लड़के', 'लड़को', 'लड़की', 'लड़कियां'], correctAnswer: 0, explanation: 'लड़का का बहुवचन रूप लड़के होता है।', points: 10 },
      { questionText: "'सच' (Sach) का विलोम (उल्टा) शब्द क्या है?", options: ['झूठ', 'अच्छा', 'बुरा', 'दुख'], correctAnswer: 0, explanation: 'सच का विलोम झूठ होता है।', points: 10 },
      { questionText: "अंग्रेजी शब्द 'Verb' को हिंदी में क्या कहते हैं?", options: ['संज्ञा', 'क्रिया', 'विशेषण', 'क्रियाविशेषण'], correctAnswer: 1, explanation: 'Verb को हिंदी में क्रिया कहते हैं।', points: 10 },
      { questionText: "'दिन' (Din) का विलोम (उल्टा) शब्द क्या है?", options: ['रात', 'सुबह', 'शाम', 'दोपहर'], correctAnswer: 0, explanation: 'दिन का विलोम रात होता है।', points: 10 },
      { questionText: "'मित्र' (Mitra) का विलोम (उल्टा) शब्द क्या है?", options: ['शत्रु', 'दोस्त', 'भाई', 'बहन'], correctAnswer: 0, explanation: 'मित्र का विलोम शत्रु (दुश्मन) होता है।', points: 10 },
      { questionText: "'सुंदर' (Sundar) किस प्रकार का शब्द है?", options: ['संज्ञा', 'क्रिया', 'विशेषण', 'सर्वनाम'], correctAnswer: 2, explanation: 'सुंदर किसी संज्ञा या सर्वनाम की विशेषता बताता है, इसलिए यह विशेषण है।', points: 10 },
      { questionText: "अंग्रेजी शब्द 'Thank you' को हिंदी में क्या कहते हैं?", options: ['नमस्ते', 'धन्यवाद', 'कृपया', 'स्वागत'], correctAnswer: 1, explanation: 'Thank you को हिंदी में धन्यवाद कहते हैं।', points: 10 }
    ]
  },
  dq_b_sst: {
    _id: 'dq_b_sst', title: 'States & Geography of India', timeLimit: 300, xpReward: 60, grade: 5,
    questions: [
      { questionText: 'What is the capital of India?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], correctAnswer: 0, explanation: 'New Delhi is the official capital.', points: 10 },
      { questionText: 'What is the capital of Uttar Pradesh?', options: ['Lucknow', 'Kanpur', 'Noida', 'Agra'], correctAnswer: 0, explanation: 'Lucknow is the state capital.', points: 10 },
      { questionText: 'Which is the national bird of India?', options: ['Peacock', 'Parrot', 'Crow', 'Eagle'], correctAnswer: 0, explanation: 'Peacock is the national bird.', points: 10 },
      { questionText: 'Which is the national animal of India?', options: ['Tiger', 'Lion', 'Elephant', 'Leopard'], correctAnswer: 0, explanation: 'Royal Bengal Tiger is the national animal.', points: 10 },
      { questionText: 'Which ocean is named after India?', options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'], correctAnswer: 0, explanation: 'Indian Ocean is named after India.', points: 10 },
      { questionText: 'How many states are there in India?', options: ['28', '29', '25', '30'], correctAnswer: 0, explanation: 'India has 28 states and 8 union territories.', points: 10 },
      { questionText: 'Which state is famous for the Taj Mahal?', options: ['Uttar Pradesh', 'Maharashtra', 'Delhi', 'Rajasthan'], correctAnswer: 0, explanation: 'Taj Mahal is in Agra, UP.', points: 10 },
      { questionText: 'Which is the longest river in India?', options: ['Ganges', 'Yamuna', 'Godavari', 'Narmada'], correctAnswer: 0, explanation: 'Ganges is the longest river.', points: 10 },
      { questionText: 'Our national anthem was written by...?', options: ['Rabindranath Tagore', 'Bankim Chandra', 'Mahatma Gandhi', 'Nehru'], correctAnswer: 0, explanation: 'Rabindranath Tagore wrote Jana Gana Mana.', points: 10 },
      { questionText: 'Which city is known as the Pink City?', options: ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer'], correctAnswer: 0, explanation: 'Jaipur is the Pink City.', points: 10 }
    ]
  },

  // --- Group C (Class 7-10) ---
  dq_c_math: {
    _id: 'dq_c_math', title: 'Equations & Algebra', timeLimit: 300, xpReward: 80, grade: 8,
    questions: [
      { questionText: 'Solve for x: 2x + 5 = 17', options: ['A) 4', 'B) 6', 'C) 8', 'D) 10'], correctAnswer: 1, explanation: '2x = 12 => x = 6.', points: 10 },
      { questionText: 'Solve for y: 3y - 4 = 11', options: ['A) 3', 'B) 5', 'C) 7', 'D) 9'], correctAnswer: 1, explanation: '3y = 15 => y = 5.', points: 10 },
      { questionText: 'Solve for z: 5z = 25', options: ['z = 2', 'z = 5', 'z = 10', 'z = 25'], correctAnswer: 1, explanation: 'z = 25/5 = 5.', points: 10 },
      { questionText: 'What is the value of 5 squared (5²)?', options: ['10', '15', '20', '25'], correctAnswer: 3, explanation: '5 squared is 5 × 5 = 25.', points: 10 },
      { questionText: 'Solve for x: x/2 + 3 = 7', options: ['x = 4', 'x = 8', 'x = 10', 'x = 12'], correctAnswer: 1, explanation: 'x/2 = 4 => x = 8.', points: 10 },
      { questionText: 'What is 10 to the power of 3 (10³)?', options: ['30', '100', '1000', '10000'], correctAnswer: 2, explanation: '10³ = 10 × 10 × 10 = 1000.', points: 10 },
      { questionText: 'Solve for a: 4a + 2 = 10', options: ['a = 2', 'a = 4', 'a = 6', 'a = 8'], correctAnswer: 0, explanation: '4a = 8 => a = 2.', points: 10 },
      { questionText: 'Find the area of a rectangle with length 5 and width 4:', options: ['9', '18', '20', '25'], correctAnswer: 2, explanation: 'Area = L × W = 5 × 4 = 20.', points: 10 },
      { questionText: 'Solve for y: 2y + 8 = 20', options: ['y = 4', 'y = 6', 'y = 8', 'y = 10'], correctAnswer: 1, explanation: '2y = 12 => y = 6.', points: 10 },
      { questionText: 'Solve for x: 3x - 5 = 10', options: ['x = 3', 'x = 5', 'x = 15', 'x = 30'], correctAnswer: 1, explanation: '3x = 15 => x = 5.', points: 10 }
    ]
  },
  dq_c_sci: {
    _id: 'dq_c_sci', title: 'Force, Motion & Energy', timeLimit: 300, xpReward: 80, grade: 8,
    questions: [
      { questionText: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 2, explanation: 'Newton is the SI unit of force.', points: 10 },
      { questionText: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '1,000 km/s', '10,000 km/s'], correctAnswer: 0, explanation: 'Light travels at 300,000 km per second.', points: 10 },
      { questionText: 'What is the chemical formula for water?', options: ['CO2', 'H2O', 'NaCl', 'O2'], correctAnswer: 1, explanation: 'Water is H2O.', points: 10 },
      { questionText: 'What is the acceleration due to gravity on Earth?', options: ['5.8 m/s²', '9.8 m/s²', '12 m/s²', '15 m/s²'], correctAnswer: 1, explanation: 'Gravity is 9.8 m/s².', points: 10 },
      { questionText: 'Which gas is main for global warming?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'], correctAnswer: 2, explanation: 'Carbon Dioxide traps greenhouse heat.', points: 10 },
      { questionText: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], correctAnswer: 2, explanation: 'Mitochondria generates cellular energy.', points: 10 },
      { questionText: 'What is the approximate pH of human blood?', options: ['5.4', '7.4', '9.4', '11.4'], correctAnswer: 1, explanation: 'Blood pH is slightly basic (around 7.4).', points: 10 },
      { questionText: 'Direct conversion of solid to gas is called...?', options: ['Evaporation', 'Sublimation', 'Condensation', 'Melting'], correctAnswer: 1, explanation: 'Sublimation bypasses the liquid state.', points: 10 },
      { questionText: 'What is the chemical symbol of Gold?', options: ['Go', 'Au', 'Ag', 'Fe'], correctAnswer: 1, explanation: 'Au comes from Latin Aurum.', points: 10 },
      { questionText: 'What is the force that opposes motion?', options: ['Gravity', 'Friction', 'Magnetic', 'Electrostatic'], correctAnswer: 1, explanation: 'Friction opposes sliding motion.', points: 10 }
    ]
  },
  dq_c_eng: {
    _id: 'dq_c_eng', title: 'Advanced Grammar & Voice', timeLimit: 300, xpReward: 80, grade: 8,
    questions: [
      { questionText: "Passive voice of: 'He opens the door.'", options: ['The door is opened by him.', 'The door was opened by him.', 'The door has been opened.', 'He had opened the door.'], correctAnswer: 0, explanation: 'Simple Present passive voice structure.', points: 10 },
      { questionText: "What is the past participle of 'Speak'?", options: ['Spoke', 'Speaked', 'Spoken', 'Speaking'], correctAnswer: 2, explanation: 'Speak-spoke-spoken.', points: 10 },
      { questionText: "Identify the conjunction in: 'I like tea and coffee.'", options: ['I', 'like', 'and', 'coffee'], correctAnswer: 2, explanation: 'and connects two nouns.', points: 10 },
      { questionText: "Choose the correct suffix for 'Hope' to make it an adjective:", options: ['-ful', '-ness', '-ly', '-ment'], correctAnswer: 0, explanation: 'Hopeful is the adjective form.', points: 10 },
      { questionText: "Reported speech of: He said, 'I am happy.'", options: ['He said that he was happy.', 'He said he is happy.', 'He says he was happy.', 'He had said he was happy.'], correctAnswer: 0, explanation: 'Simple present changes to simple past.', points: 10 },
      { questionText: "What is the synonym of 'Fragile'?", options: ['Strong', 'Delicate', 'Heavy', 'Hard'], correctAnswer: 1, explanation: 'Delicate means easily broken.', points: 10 },
      { questionText: "What is the opposite of 'Gigantic'?", options: ['Huge', 'Large', 'Tiny', 'Wide'], correctAnswer: 2, explanation: 'Tiny is opposite of gigantic.', points: 10 },
      { questionText: "Find the correct article: 'He is ___ honest man.'", options: ['a', 'an', 'the', 'no article'], correctAnswer: 1, explanation: 'honest starts with a vowel sound.', points: 10 },
      { questionText: "Active voice of: 'The letter was written by her.'", options: ['She writes the letter.', 'She wrote the letter.', 'She is writing the letter.', 'She had written the letter.'], correctAnswer: 1, explanation: 'Past passive changes to Simple Past active.', points: 10 },
      { questionText: "Select correct pronoun: 'Each student must bring ___ own book.'", options: ['their', 'his/her', 'our', 'its'], correctAnswer: 1, explanation: 'Each is singular.', points: 10 }
    ]
  },
  dq_c_hin: {
    _id: 'dq_c_hin', title: 'हिंदी व्याकरण और नियम', timeLimit: 300, xpReward: 80, grade: 8,
    questions: [
      { questionText: "'विद्यालय' (Vidyalaya) का सही संधि विच्छेद क्या है?", options: ['विद्या + लय', 'विद्या + आलय', 'विद्य + आलय', 'विद् + लय'], correctAnswer: 1, explanation: 'विद्या + आलय = विद्यालय (यह दीर्घ स्वर संधि है)।', points: 10 },
      { questionText: "'सूर्योदय' (Suryodaya) का सही संधि विच्छेद क्या है?", options: ['सूर्य + उदय', 'सूर्यो + दय', 'सुर + उदय', 'सूर्य + दय'], correctAnswer: 0, explanation: 'सूर्य + उदय = सूर्योदय (यह गुण स्वर संधि है)।', points: 10 },
      { questionText: "'अनुराग' (Anuraag) का विलोम (उल्टा) शब्द क्या है?", options: ['विराग', 'प्रेम', 'द्वेष', 'क्रोध'], correctAnswer: 0, explanation: 'अनुराग का विलोम शब्द विराग होता है।', points: 10 },
      { questionText: "इनमें से 'आकाश' (Aakash) का पर्यायवाची शब्द कौन सा है?", options: ['गगन', 'पृथ्वी', 'जल', 'अग्नि'], correctAnswer: 0, explanation: 'गगन का अर्थ आकाश होता है।', points: 10 },
      { questionText: "हिंदी व्याकरण में 'समास' (Samas) का क्या अर्थ है?", options: ['शब्दों का संक्षेपीकरण (संक्षेप करना)', 'वाक्य परिवर्तन', 'काल परिवर्तन', 'वर्णों का मेल'], correctAnswer: 0, explanation: 'समास का अर्थ शब्दों को संक्षेप में मिलाकर नया शब्द बनाना होता है।', points: 10 },
      { questionText: "'उपकार' (Upkaar) शब्द में कौन सा उपसर्ग लगा है?", options: ['उप', 'कार', 'उपकार', 'अर'], correctAnswer: 0, explanation: 'उपकार में मुख्य शब्द कार के आगे "उप" उपसर्ग लगा है।', points: 10 },
      { questionText: "'लिखावट' (Likhawat) शब्द में कौन सा प्रत्यय लगा है?", options: ['लिख', 'आवट', 'वट', 'वट/लिखा'], correctAnswer: 1, explanation: 'लिखावट में मुख्य शब्द लिख के पीछे "आवट" प्रत्यय लगा है।', points: 10 },
      { questionText: "'आदर' (Aadar) का विलोम (उल्टा) शब्द क्या है?", options: ['निरादर', 'सम्मान', 'प्यार', 'दुश्मन'], correctAnswer: 0, explanation: 'आदर का विलोम शब्द निरादर होता है।', points: 10 },
      { questionText: "अंग्रेजी शब्द 'Adjective' को हिंदी व्याकरण में क्या कहते हैं?", options: ['संज्ञा', 'सर्वनाम', 'विशेषण', 'क्रियाविशेषण'], correctAnswer: 2, explanation: 'Adjective को हिंदी में विशेषण कहा जाता है।', points: 10 },
      { questionText: "'जल' (Jal) का पर्यायवाची शब्द कौन सा है?", options: ['पानी', 'अग्नि', 'वायु', 'धरती'], correctAnswer: 0, explanation: 'पानी, नीर, तोय आदि जल के पर्यायवाची शब्द हैं।', points: 10 }
    ]
  },
  dq_c_sst: {
    _id: 'dq_c_sst', title: 'Indian Constitution & Civics', timeLimit: 300, xpReward: 80, grade: 8,
    questions: [
      { questionText: 'Who is known as the Father of the Indian Constitution?', options: ['Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Dr. Rajendra Prasad'], correctAnswer: 1, explanation: 'Dr. B.R. Ambedkar chaired the drafting committee.', points: 10 },
      { questionText: 'Who was the first Prime Minister of India?', options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Lal Bahadur Shastri', 'Indira Gandhi'], correctAnswer: 0, explanation: 'Jawaharlal Nehru served first.', points: 10 },
      { questionText: 'How many Fundamental Rights are in the Indian Constitution?', options: ['5', '6', '7', '8'], correctAnswer: 1, explanation: 'There are 6 fundamental rights.', points: 10 },
      { questionText: 'Who is the formal head of the Indian state?', options: ['Prime Minister', 'President', 'Chief Justice', 'Governor'], correctAnswer: 1, explanation: 'President is formal head.', points: 10 },
      { questionText: 'What is the term duration of the Lok Sabha?', options: ['4 years', '5 years', '6 years', 'Permanent'], correctAnswer: 1, explanation: 'Lok Sabha term is 5 years.', points: 10 },
      { questionText: 'What is the minimum voting age in India?', options: ['16 years', '18 years', '21 years', '25 years'], correctAnswer: 1, explanation: 'Voting age was lowered to 18.', points: 10 },
      { questionText: 'Which is the Apex Court in India?', options: ['Supreme Court', 'High Court', 'District Court', 'Gram Panchayat'], correctAnswer: 0, explanation: 'Supreme Court is the highest.', points: 10 },
      { questionText: 'Who was the first President of India?', options: ['Dr. Rajendra Prasad', 'Dr. S. Radhakrishnan', 'Zakir Husain', 'Nehru'], correctAnswer: 0, explanation: 'Dr. Rajendra Prasad was first.', points: 10 },
      { questionText: 'Which organ of the government makes laws?', options: ['Legislature (Parliament)', 'Executive', 'Judiciary', 'Media'], correctAnswer: 0, explanation: 'Parliament creates laws.', points: 10 },
      { questionText: 'The National Flag of India is also called...?', options: ['Tricolor (Tiranga)', 'Red Flag', 'Union Jack', 'Stars and Stripes'], correctAnswer: 0, explanation: 'Tiranga is Indian Flag.', points: 10 }
    ]
  }
};

const getGroupFromGrade = (grade) => {
  const g = Number(grade);
  if (g >= 1 && g <= 3) return 'A';
  if (g >= 4 && g <= 6) return 'B';
  return 'C';
};

export default function QuizPlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const [quiz, setQuiz]           = useState(null);
  const [current, setCurrent]     = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft]   = useState(0);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const qData = DEMO_QUIZZES_DATA[id] || DEMO_QUIZZES_DATA['dq_c_math'];
    setQuiz(qData);
    setSelectedAnswers(Array(qData.questions.length).fill(null));
    setTimeLeft(qData.timeLimit);
    setLoading(false);
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!quiz || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [quiz, timeLeft]);

  const submitQuiz = useCallback(async (finalAnswers) => {
    setSubmitting(true);
    
    const userGroup = getGroupFromGrade(user?.grade || 8);
    const quizGroup = getGroupFromGrade(quiz?.grade || 8);
    const isPracticeMode = quizGroup !== userGroup;

    // Mock/local submit calculation (works for both Demo and Firebase users)
    let score = 0;
    let totalPoints = 0;
    const processedAnswers = finalAnswers.map((ans, i) => {
      const question = quiz.questions[i];
      const isCorrect = ans.selectedOption === question.correctAnswer;
      if (isCorrect) score += question.points;
      totalPoints += question.points;
      return { questionIndex: i, selectedOption: ans.selectedOption, isCorrect };
    });
    
    const xpEarned = isPracticeMode ? 0 : Math.round((score / totalPoints) * quiz.xpReward);
    
    // Update local state & Firestore (via updateUser)
    if (!isPracticeMode) {
      const newXp = (user?.xp || 0) + xpEarned;
      const newLevel = Math.floor(newXp / 200) + 1;
      let updatedBadges = [...(user?.badges || [])];
      
      // Auto-unlock milestone badges
      if (newXp >= 100 && !updatedBadges.includes('Bronze Milestone Badge')) {
        updatedBadges.push('Bronze Milestone Badge');
        toast.success(language === 'hi' ? '🏅 ब्रॉन्ज़ माइलस्टोन बैज अनलॉक हुआ!' : '🏅 Unlocked Bronze Milestone Badge!');
      }
      if (newXp >= 300 && !updatedBadges.includes('Silver Milestone Badge')) {
        updatedBadges.push('Silver Milestone Badge');
        toast.success(language === 'hi' ? '🏅 सिल्वर माइलस्टोन बैज अनलॉक हुआ!' : '🏅 Unlocked Silver Milestone Badge!');
      }
      if (newXp >= 500 && !updatedBadges.includes('Gold Milestone Badge')) {
        updatedBadges.push('Gold Milestone Badge');
        toast.success(language === 'hi' ? '🏅 गोल्ड माइलस्टोन बैज अनलॉक हुआ!' : '🏅 Unlocked Gold Milestone Badge!');
      }
      
      updateUser({ xp: newXp, level: newLevel, badges: updatedBadges });
    }

    const result = {
      score,
      totalPoints,
      xpEarned,
      practiceMode: isPracticeMode,
      timeTaken: quiz.timeLimit - timeLeft,
      answers: processedAnswers
    };

    setTimeout(() => {
      navigate(`/quizzes/${id}/result`, { state: { result, quiz } });
      setSubmitting(false);
    }, 500);
  }, [id, quiz, timeLeft, navigate, user, updateUser]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && quiz && selectedAnswers.length > 0) {
      const formattedAnswers = selectedAnswers.map(ans => ({
        selectedOption: ans !== null ? ans : -1
      }));
      submitQuiz(formattedAnswers);
    }
  }, [timeLeft, quiz, selectedAnswers, submitQuiz]);

  const handleSelect = (optionIdx) => {
    if (selectedAnswers[current] !== null) return; // already answered

    setSelectedAnswers(prev => {
      const updated = [...prev];
      updated[current] = optionIdx;
      return updated;
    });
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= quiz.questions.length) {
      const formattedAnswers = selectedAnswers.map(ans => ({
        selectedOption: ans !== null ? ans : -1
      }));
      submitQuiz(formattedAnswers);
    } else {
      setCurrent(c => c + 1);
    }
  };

  if (loading) return <div className="loading-screen">{language === 'hi' ? 'क्विज़ लोड हो रहा है...' : 'Loading Quiz...'}</div>;
  if (!quiz)   return <div className="loading-screen">{language === 'hi' ? 'क्विज़ नहीं मिला।' : 'Quiz not found.'}</div>;

  const userGroup = getGroupFromGrade(user?.grade || 8);
  const quizGroup = getGroupFromGrade(quiz?.grade || 8);
  const isPracticeMode = quizGroup !== userGroup;

  const q = quiz.questions[current];
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const progress = ((current) / quiz.questions.length) * 100;
  const answer = selectedAnswers[current];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 8px' }}>
      {isPracticeMode && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#d97706',
          padding: '8px 12px',
          borderRadius: '10px',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          {language === 'hi' ? '⚠️ अभ्यास मोड सक्रिय: इस क्विज़ को पूरा करने पर 0 XP मिलेगा।' : '⚠️ Practice Mode Active: Completing this quiz will reward 0 XP.'}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{quiz.title}</h1>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            {language === 'hi' ? `प्रश्न ${current + 1} / ${quiz.questions.length}` : `Question ${current + 1} of ${quiz.questions.length}`}
          </div>
        </div>
        <div className={`timer ${timeLeft <= 30 ? 'urgent' : ''}`} style={{ fontSize: '1.25rem' }}>⏱ {mins}:{secs}</div>
      </div>

      {/* Progress Bar */}
      <div className="xp-bar-container" style={{ marginBottom: '16px', height: '6px' }}>
        <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--text)' }}>{q.questionText}</h2>
        {q.imageUrl && <img src={q.imageUrl} alt="question" style={{ marginTop: '10px', borderRadius: '8px', maxHeight: '140px', objectFit: 'contain' }} />}
      </div>

      {/* Options */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '10px',
        marginBottom: '16px'
      }}>
        {q.options.map((opt, i) => {
          let cls = 'option-btn';
          if (answer !== null) {
            if (i === q.correctAnswer) cls += ' correct';
            else if (i === answer)   cls += ' wrong';
          }
          return (
            <button
              key={i}
              className={cls}
              style={{
                padding: '12px 16px',
                fontSize: '0.95rem',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => handleSelect(i)}
              disabled={answer !== null}
            >
              <span style={{ fontWeight: 700, marginRight: '8px', color: 'var(--primary)' }}>{String.fromCharCode(65+i)}.</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {answer !== null && q.explanation && (
        <div style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', marginBottom: '12px', fontSize: '0.85rem', color: '#10b981' }}>
          💡 {q.explanation}
        </div>
      )}

      {/* Navigation Controls */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'space-between' }}>
        {current > 0 ? (
          <button className="btn btn-secondary" style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={handlePrevious}>
            {language === 'hi' ? '← पिछला' : '← Previous'}
          </button>
        ) : <div />}
        
        <button 
          className="btn btn-primary" 
          style={{ 
            padding: '10px 24px', 
            cursor: (answer !== null && !submitting) ? 'pointer' : 'not-allowed',
            opacity: answer !== null ? 1 : 0.5 
          }} 
          onClick={handleNext} 
          disabled={answer === null || submitting}
        >
          {submitting ? (
            language === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...'
          ) : current + 1 >= quiz.questions.length ? (
            language === 'hi' ? '🏁 क्विज़ समाप्त करें' : '🏁 Finish Quiz'
          ) : (
            language === 'hi' ? 'अगला प्रश्न →' : 'Next Question →'
          )}
        </button>
      </div>
    </div>
  );
}
