using UnityEditor;
using UnityEngine;

namespace Editor
{
    public class MeshSaver : MonoBehaviour
    {
        [MenuItem("Tools/Mesh/Save Mesh")]
        public static void SaveMesh()
        {
            GameObject go = Selection.activeObject as GameObject;
        
            // Create the directory if it doesn't exist
            // Change the path to whatever directory you want to save the mesh to
            if (!System.IO.Directory.Exists("Assets/Meshes"))
            {
                System.IO.Directory.CreateDirectory("Assets/Meshes");
            }

            MeshFilter mf = go.GetComponent<MeshFilter>();
            Mesh meshToSave = mf.sharedMesh;                    

            AssetDatabase.CreateAsset(meshToSave, "Assets/Meshes" + go.name + ".asset");
            AssetDatabase.SaveAssets();
        }

        [MenuItem("Tools/Mesh/Save Multiple Meshes")]
        public static void SaveMeshes()
        {
            GameObject[] gos = Selection.gameObjects;

            foreach (GameObject go in gos)
            {
                MeshFilter mf = go.GetComponent<MeshFilter>();
                if (mf == null) continue;
                Mesh meshToSave = mf.sharedMesh;
                AssetDatabase.CreateAsset(meshToSave, "Assets/Models/RingMeshesWithUVs/" + go.name + ".asset");
            }
            AssetDatabase.SaveAssets();
        }
    }
}