using UnityEditor;
using UnityEditor.Overlays;
using UnityEditor.Toolbars;
using UnityEngine;

namespace Editor
{
    [Overlay(typeof(SceneView), "Utility Functions")]
    [Icon(icons_path + "Shortcut.png")]
    public class UtilityFunctionsOverlay : ToolbarOverlay
    {
        public const string icons_path = "Assets/Editor/Icons/";


        UtilityFunctionsOverlay() : base(SetAnchorsToPosition.Id)
        { }
    
        
    
        [EditorToolbarElement(Id)]
        class SetAnchorsToPosition : EditorToolbarButton
        {
            public const string Id = "Functions/Anchors";

            public SetAnchorsToPosition()
            {
                this.text = "Set Anchors To Position";
                this.icon = AssetDatabase.LoadAssetAtPath<Texture2D>(icons_path + "Anchors.png");
                this.tooltip = "Set Anchors To Position";
                this.clicked += OnClick;
            }

            void OnClick()
            {
                Transform mytransform = Selection.activeTransform;
                if (mytransform.parent != null)
                {
                    float screenwidth = mytransform.parent.GetComponent<RectTransform>().rect.size.x;
                    float screenheigth = mytransform.parent.GetComponent<RectTransform>().rect.size.y;
                    float mytransformPosx = mytransform.GetComponent<RectTransform>().localPosition.x;
                    float mytransformPosY = mytransform.GetComponent<RectTransform>().localPosition.y;

                    float mytransformwidht = mytransform.GetComponent<RectTransform>().rect.size.x;
                    float mytransformheight = mytransform.GetComponent<RectTransform>().rect.size.y;
                    float minvaluex = (mytransformPosx - (mytransformwidht / 2)) / screenwidth;
                    float maxvaluex = (mytransformPosx + (mytransformwidht / 2)) / screenwidth;

                    float roundedminvaluex = Mathf.Round(minvaluex * 1000f) / 1000f;
                    float roundedmaxvaluex = Mathf.Round(maxvaluex * 1000f) / 1000f;
                
                    float minvaluey = (mytransformPosY - (mytransformheight / 2)) / screenheigth;
                    float maxvaluey = (mytransformPosY + (mytransformheight / 2)) / screenheigth;
                
                    float roundedminvaluey = Mathf.Round(minvaluey * 1000f) / 1000f;
                    float roundedmaxvaluey = Mathf.Round(maxvaluey * 1000f) / 1000f;

                    mytransform.GetComponent<RectTransform>().anchorMin = new Vector2(.5f + roundedminvaluex, .5f + roundedminvaluey);
                    mytransform.GetComponent<RectTransform>().anchorMax = new Vector2(.5f + roundedmaxvaluex, .5f + roundedmaxvaluey);
                    mytransform.GetComponent<RectTransform>().sizeDelta = Vector2.zero;
                    mytransform.GetComponent<RectTransform>().anchoredPosition = Vector2.zero;
                }

                Undo.RecordObject(mytransform, mytransform.gameObject.name + "Anchors Set");
                if (PrefabUtility.IsPartOfAnyPrefab(mytransform)) 
                    PrefabUtility.RecordPrefabInstancePropertyModifications(mytransform);
            }
    
        }
    }
}
