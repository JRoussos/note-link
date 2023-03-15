import mosaica_0 from '../assets/imgs/banners/mosaica.jpg'
import mosaica_1 from '../assets/imgs/projects/mosaica/mosaica (1).jpg'
import mosaica_2 from '../assets/imgs/projects/mosaica/mosaica (2).jpg'
import mosaica_3 from '../assets/imgs/projects/mosaica/mosaica (3).jpg'
import mosaica_4 from '../assets/imgs/projects/mosaica/mosaica (4).jpg'
import mosaica_5 from '../assets/imgs/projects/mosaica/mosaica (5).jpg'

import flowers_0 from '../assets/imgs/banners/flowers.jpg'
import flowers_1 from '../assets/imgs/projects/flowers/flowers (1).png'
import flowers_2 from '../assets/imgs/projects/flowers/flowers (2).png'
import flowers_3 from '../assets/imgs/projects/flowers/flowers (3).png'
import flowers_4 from '../assets/imgs/projects/flowers/flowers (4).png'
import flowers_5 from '../assets/imgs/projects/flowers/flowers (5).png'
import flowers_6 from '../assets/imgs/projects/flowers/flowers (6).png'

import learning_0 from '../assets/imgs/banners/learning.jpg'
import learning_1 from '../assets/imgs/projects/learning/learning (1).jpg'
import learning_2 from '../assets/imgs/projects/learning/learning (2).jpg'
import learning_3 from '../assets/imgs/projects/learning/learning (3).mp4'
import learning_4 from '../assets/imgs/projects/learning/learning (4).jpg'
import learning_5 from '../assets/imgs/projects/learning/learning (5).mp4'

import lorenz_0 from '../assets/imgs/banners/nlorenz.png'
import lorenz_1 from '../assets/imgs/projects/lorenz/lorenz (Custom).png'
import lorenz_2 from '../assets/imgs/projects/lorenz/lorenz (2).png'
import lorenz_3 from '../assets/imgs/projects/lorenz/lorenz (3).png'
import lorenz_4 from '../assets/imgs/projects/lorenz/lorenz (4).png'
import lorenz_5 from '../assets/imgs/projects/lorenz/lorenz (5).png'
import lorenz_6 from '../assets/imgs/projects/lorenz/lorenz (6).png'

import profile from '../assets/imgs/myself.jpg'

export const photos = [
    profile,
    mosaica_0, mosaica_1, mosaica_2, mosaica_3, mosaica_4, mosaica_5, 
    flowers_0, flowers_1, flowers_2, flowers_3, flowers_4, flowers_5, flowers_6,
    learning_0, learning_1, learning_2, learning_5, learning_4,
    lorenz_0, lorenz_1, lorenz_2, lorenz_3, lorenz_5, lorenz_6
]

const data = [
    {
        id: 'yNoTP',
        name: "Mosaica",
        fullname: "Mosaica",
        desc: "CLI to generate mosaics from a set of photos",
        info: [
            "I had a conversation with a friend about how cool the concept of generating mosaics from a set of photos is. I began this project as a proof of concept, to see how difficult it would be to make a tool like that.",
            "The basic idea is simple: we calculate the average RGB values of a certain area of the image. Then, we process those average values and find an image that better matches each color."
        ],
        path: 'mosaica',
        media: {        
            picture: mosaica_0,
            l1: mosaica_1,
            l2: mosaica_2,
            l3: mosaica_3,
            l4: mosaica_4,
            l5: mosaica_5,
        },
        layout: [
            [
                {
                    image: mosaica_1,
                    aspect: 7.549,
                    percentage: '100%'
                }
            ],
            [
                {
                    image: mosaica_2,
                    aspect: 2.032,
                    percentage: '45.93%'
                },
                {
                    image: mosaica_3,
                    aspect: 2.292,
                    percentage: '51.82%'
                }
            ],
            [
                {
                    image: mosaica_4,
                    aspect: 1.225,
                    percentage: '33.64%'
                },
                {
                    image: mosaica_5,
                    aspect: 2.375,
                    percentage: '65.20%'
                }
            ]
        ],
        links: [
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/mosaic-generator"
            }
        ]
    },
    {
        id: 'p9rbW',
        name: "Flowers",
        fullname: "Flowers",
        desc: "Splitting images into animated particles",
        info: [
            "A demo for splitting images into their pixels and animating each of them as a particle with its own attributes and mouse interactions using React and React Three Fiber.",
            "For some reason, I always find myself very attracted to the concept of particles and bringing them to life by animating them. When I read that article by Bruno Imbrizi, I went on to try it myself."
        ],
        path: 'flowers',
        media: {
            picture: flowers_0,
            l1: flowers_1,
            l2: flowers_2,
            l3: flowers_3,
            l4: flowers_4,
            l5: flowers_5,
            l6: flowers_6,
        },
        layout: [
            [
                {
                    image: flowers_1,
                    aspect: 1.634,
                    percentage: '45.36%'
                },
                {
                    image: flowers_2,
                    aspect: 1.909,
                    percentage: '53.02%'
                }
            ],
            [
                {
                    image: flowers_3,
                    aspect: 4.183,
                    percentage: '100%'
                }
            ],
            [
                {
                    image: flowers_4,
                    aspect: 1.956,
                    percentage: '64.58%'
                },
                {
                    image: flowers_5,
                    aspect: 1,
                    percentage: '33.28%'
                }
            ],
            [
                {
                    image: flowers_6,
                    aspect: 3.535,
                    percentage: '100%'
                }
            ],
        ],
        links: [
            {   
                title: 'Visit website', 
                url: "https://some-flowers-for-you.netlify.app/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/a-reactive-particle-system"
            }
        ]
    },
    {
        id: '0K8g2',
        name: "Journey",
        fullname: "Journey",
        desc: "A collection of small Three JS projects",
        info: [
            "Some time ago, I saw an example of a website using the WebGL library and was captivated. I was extremely interested in learning this new thing, so I started researching it.",
            "I read about GLSL, Three.js, and shaders, and now that I have a basic understanding of the concept, it's time to start practicing. This is a collection of cool ideas and stuff I wanted to try and learn as far as 3D web design goes."
        ],
        path: 'journey',        
        media: {        
            picture: learning_0,
            l1: learning_1,
            l2: learning_2,
            l3: learning_3,
            l4: learning_4,
        },
        layout: [
            [
                {
                    image: learning_1,
                    aspect: 1.482,
                    percentage: '48.95%'
                },
                {
                    image: learning_2,
                    aspect: 1.498,
                    percentage: '49.47%'
                }
            ],
            [
                {
                    image: learning_3,
                    aspect: 5.597,
                    percentage: '100%'
                }
            ],
            [
                {
                    image: learning_4,
                    aspect: 0.878,
                    percentage: '30.83%'
                },
                {
                    image: learning_5,
                    aspect: 1.910,
                    percentage: '67.08%'
                }
            ],
        ],
        links: [
            {   
                title: 'Visit website', 
                url: "https://learning-three-js.netlify.app/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/learning-three-js"
            }
        ]
    },
    {
        id: 'cMZtH',
        name: "Chaos",
        fullname: "Chaos",
        desc: "A visualization of the 'The Butterfly Effect'",
        info: [
            "I have been reading a book lately by James Gleick about chaos theory and the science of unpredictable events. In it, there is a chapter that describes the story of Edward Lorenz and his discovery of the butterfly effect. Reading that inspired me to make my version of the famous Lorenz attractor.",
            "Lorenz found that if you have a system with some initial values that are basically the same, but only have the tiniest deviation from one another, as time passes, those tiny differences scale up, and after a few iterations, the values end up completely unrelated and with their own trajectory."
        ],
        path: 'chaos',
        media: {        
            picture: lorenz_0,
            l2: lorenz_2,
            l3: lorenz_3,
            l1: lorenz_1,
            l5: lorenz_5,
            l6: lorenz_6,
        },
        layout: [
            [
                {
                    image: lorenz_1,
                    aspect: 2.612,
                    percentage: '65.58%'
                },
                {
                    image: lorenz_4,
                    aspect: 1.307,
                    percentage: '34.42%'
                }
            ],
            [
                {
                    image: lorenz_2,
                    aspect: 1.965,
                    percentage: '42.75%'
                },
                {
                    image: lorenz_5,
                    aspect: 2.731,
                    percentage: '57.25%'
                }
            ],
            [
                {
                    image: lorenz_3,
                    aspect: 2.134,
                    percentage: '67.13%'
                },
                {
                    image: lorenz_6,
                    aspect: 1,
                    percentage: '32.87%'
                }
            ],
        ],
        links: [
            {   
                title: 'Visit website', 
                url: "https://lorenz-attractor-visualization.netlify.app"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/lorenz-attractor"
            }
        ]
    }
]

export default data;
