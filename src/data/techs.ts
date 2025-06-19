import { ContentBlock } from "@/types/content";

export type Tech = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    content: ContentBlock[];
    thumbnail?: string;
    buildUrl?: string;
}

const textStyle = {
  backgroundColor: 'white',
  textColor: 'black',
  borderRadius: 5,
  padding: 15,
}

export const techs: Tech[] = [
    {
        slug: "unity-tools",
        title: "Unity Tools",
        thumbnail: "/images/tech/code.jpg",
        description: "A small number of editor scripts that I have made for unity over the years, hope they serve you as they did me!",
        tags: ["C#", "Unity", "Editor Tools"],
        content: [
            {
                type: "text",
                content: "One of my favorite things in game development is making tools and productivity scripts, here are a couple of small scripts for quality of life improvements in Unity.",
                style: {...textStyle, marginBottom: 100}
            },
            {
                title: "Set Anchors To Position",
                type: "text",
                sideBySide: true,
                content: "The most frustrating thing in Unity is the UI system, I mean it works great, but then you move on to a different resolution and maybe you forgot to change the canvas scalar settings to fit whatever resolution you currently worked on and now you have to go back and figure out locations for everything.\nSo, I made a simple script that will lock any UI element's anchors to where its rect transform is currently at.",
                style: textStyle
            },
            {
                type: "image",
                url: "/images/tech/anchors.gif",
                minWidth: 300,
                minHeight: 300,
            },
            {
                type: "code",                
                language: "csharp",
                codeFile: "/code/UtilityFunctionsOverlay.cs",
                startLine: 1,
                endLine: 100,
                referenceText: "UtilityFunctionsOverlay.cs",                
            },
            
            {
                title: "Mesh Utils",
                type: "text",
                content: "I have been working with meshes for a while now, more specifically, proceduraly generated meshes.\nThis brought up a need for a bunch of different utilities, saving a randomized mesh, editing existing meshes in blender or mass saving a complicated set mesh so that you can load it back quickly without running the generation code.\nThis is another small script that allows you to ",
                style: {...textStyle, marginTop: 100}
            },
            {
                type: "code",                
                language: "csharp",
                codeFile: "/code/MeshUtils.cs",
                startLine: 1,
                endLine: 100,
                referenceText: "MeshUtils.cs",                
            },
            {
                title: "API Docs Generator",
                type: "text",
                content: "While working on a Project Tower I found my codebase was getting very big with a lot of repetitive functionalities, I wanted to have a way to view all functions in the codebase and search through them so I don't end up repeating myself. Coming from web development I was used to having a automatic documentation generator for my APIs, whenever you create a backend server you typically have to write a lot of documentation for your API endpoints, that was what I was trying to achieve here.\nThis script generates a json file that you can later load into a website that will display all your functions.\n\nIf you want to use it you need to also download this vanilla website and unzip it in your assets folder.",
                style: {...textStyle, marginTop: 100},
                links: [
                    {
                        text: "vanilla website",
                        url: "/downloads/Documentation.7z",
                        isDownload: true,
                        fileName: "Documentation.7z"
                    }
                ]
            },
            {
                type: "image",
                url: "/images/tech/docs.gif",
                sideBySide: true,
                minWidth: 300,                
                minHeight: 300,
            },
            {
                type: "code",                
                language: "csharp",
                codeFile: "/code/ReflectionDocumentationGenerator.cs",
                startLine: 1,
                endLine: 100,
                referenceText: "ReflectionDocumentationGenerator.cs",                                
                minHeight: 300,
                style: {
                    maxWidth: 600,
                }
            },

        ],
    },
    {
        slug: "star-chart",
        title: "Star Chart",
        thumbnail: "/images/tech/starchart.jpg",
        description: "A presentations tool built within Unity",
        tags: ["C#", "Unity", "Editor Tools"],
        content: [
            {
                title: "Star Chart",
                type: "text",                
                content: "While pursuing my MFA in Game Design I found myself needing a presentation tool that would enable me to do things that Google Slides or Canva could not provide (or I was too lazy to look up). From working in mobile games I had a lot of experience with creating Unity UI systems, so I decided to make the presentation tool myself, crazy? might be, but I love the end result.",
                style: textStyle
            },
            {
                type: "text",
                sideBySide: true,
                content: "This is one of the presentations I made, it explores how Pacific Drive uses diegetic UI to enhance the desired design exxperience for the game",
                style: textStyle
            },
            {
                type: "list",
                style: textStyle,         
                subheading: "Controls",
                items: [
                    "Right and left arrow keys change slides",
                    "Press S to toggle movement animation",
                    "Press TAB to open the slide selection menu",
                    "Scroll mouse to zoom in/out",
                    "Drag to move around",
                ]
            },                     
            {
                type: "build",
                url: "/games/starchart/index.html",
                alt: "Star Chart",
                referenceText: "Pacific Drive Superlative UX/UI Presentation",
                minWidth: 200,
                minHeight: 700,
            },

        ],
    },
    {
        slug: "super-session",
        title: "Super Session",
        thumbnail: "/images/tech/session.jpg",
        description: "A web app that indexes all your YouTube watch history and allows you to search it by keywords, leading to the timestamps within those videos.",
        tags: ["Javascript", "Chrome Extension", "Node.js", "Elasticsearch"],
        content: [
            {
                type: "text",
                content: "Super Session is one of my favorite tools I got to make over the years. The idea behind it was to make a tool that would allow me to search through my YouTube watch history by keywords, and then get the timestamps of the videos that contain those keywords. At the time I started making this I was learning a lot of different tools on YouTube, (Unity, Blender, Ableton, Adobe), I got tutorial fatigue, and it was getting hard to find older videos that I have watched before I was working as a web developer at a small startup that used Elasitcsearch for their search engine, so I thought I could use it to index my watch history. I made a chrome extension that would send to a local server the captions of the videos and a frontend webpage to view them. Therefore, this project is broken down to 3 different parts:",
                style: textStyle
            },
            {
                type: "text",
                content: "Chrome extension that sends the captions of the videos to the server - github",
                style: textStyle,
                links: [
                    {
                        text: "github",
                        url: "https://github.com/GuyGinat/extended-ext-v3"
                    }
                ]
            },
            {
                type: "text",
                content: "Node.js server that indexes the captions and allows you to search them - github",
                style: textStyle,
                links: [
                    {
                        text: "github",
                        url: "https://github.com/GuyGinat/extnded-back"
                    }
                ]
            },
            {
                type: "text",
                content: "Frontend webpage to view the captions and search them - github",
                style: textStyle,
                links: [
                    {
                        text: "github",
                        url: "https://github.com/GuyGinat/extended-front"
                    }
                ]
            }
        ],
    },    
    {
        slug: "noteman",
        title: "Noteman",
        thumbnail: "/images/tech/notes.jpg",
        description: "Chrome extension that allows you and your friends to share sticky notes across the internet",
        tags: ["Javascript", "Chrome Extension", "Gun.js"],
        content: [
            {
                type: "text",
                content: "Noteman is a little experiment in distributed data management. I came across this Javascript library called Gun that allows you to create a distributed database that can be synced between different clients. After making a couple of small chrome extensions, I wandered how they can be used in combination with Gun to allow web users to exchange ideas and preserve information on actual web pages. I hope you enjoy this little experiment, and if you have any ideas on how to improve it, please let me know.\n\nGithub",
                style: textStyle,
                links: [
                    {
                        text: "Gun",
                        url: "https://gun.eco/"
                    },
                    {
                        text: "Github",
                        url: "https://github.com/GuyGinat/noteman"
                    }
                ]
            }
        ],
    },
]