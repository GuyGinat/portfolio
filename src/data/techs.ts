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
        description: "Editor scripts I've written for Unity over the years. Free to use.",
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
                content: "The most frustrating part of Unity's UI system: it works great, until you move on to a different resolution and maybe you forgot to change the canvas scalar settings to fit whatever resolution you currently worked on and now you have to go back and figure out locations for everything.\nSo, I made a simple script that will lock any UI element's anchors to where its rect transform is currently at.",
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
                content: "I have been working with meshes for a while now, more specifically, procedurally generated meshes.\nThis brought up a need for a bunch of different utilities, saving a randomized mesh, editing existing meshes in blender or mass saving a complicated set mesh so that you can load it back quickly without running the generation code.\nThis script saves generated meshes as assets, so you can edit them in Blender or reload a complex result without rerunning the generator.",
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
                content: "While working on Tower I found my codebase was getting very big with a lot of repetitive functionalities, I wanted to have a way to view all functions in the codebase and search through them so I don't end up repeating myself. Coming from web development I was used to having an automatic documentation generator for my APIs, whenever you create a backend server you typically have to write a lot of documentation for your API endpoints, that was what I was trying to achieve here.\nThis script generates a json file that you can later load into a website that will display all your functions.\n\nIf you want to use it you need to also download this vanilla website and unzip it in your assets folder.",
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
        description: "A zoomable, animated presentation tool built in Unity.",
        tags: ["C#", "Unity", "Editor Tools"],
        content: [
            {
                title: "Star Chart",
                type: "text",                
                content: "While pursuing my MFA in Game Design I found myself needing a presentation tool that would enable me to do things that Google Slides or Canva could not provide . From working in mobile games I had a lot of experience with creating Unity UI systems, so I built the presentation tool myself.",
                style: textStyle
            },
            {
                type: "text",
                sideBySide: true,
                content: "This is one of the presentations I made, it explores how Pacific Drive uses diegetic UI to enhance the desired design experience for the game",
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
]
