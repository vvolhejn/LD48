import { Terrain } from "../terrain"
import { TDScene } from "./tdScene";
import { TDSceneConfig } from "./tdSceneConfig"

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'metaScene',
};

export class MetaScene extends Phaser.Scene {

    public scenes: TDScene[]
    public activeSceneIndex: number

    constructor(){
        super(sceneConfig);
    }

    public create() {
        this.scenes = [];
        this.addScene();
        this.scenes[0].scene.setVisible(true);
        this.activeSceneIndex = 0
        this.scene.start("hudScene")
    }

    // Creates new Scene, enables it, and sets it invisible
    public addScene(parentScene?: TDScene): TDScene {

        let sceneIndexParent = parentScene?.sceneIndex ?? -1;
        let sceneLevel = (parentScene?.sceneLevel ?? -1) + 1 ;

        let sceneIndex = this.scenes.length;
        let newScene = new TDScene(
            new TDSceneConfig(new Terrain(10, 8), sceneIndex, sceneLevel, sceneIndexParent),
            this);

        this.scene.add(
            `tdScene${sceneIndex}`,
            newScene,
            true
            );
        this.scenes.push(newScene)
        newScene.scene.setVisible(false);
        this.scene.bringToTop('hudScene');
        
        return newScene;
    }


    // makes current scene invisible, makes new scene visible; doesn't change activness
    public switchToScene(switchToIndex: number) {
        this.scenes[this.activeSceneIndex].setIsForeground(false);
        this.scenes[switchToIndex].setIsForeground(true);

        this.activeSceneIndex = switchToIndex;
    }

    update(time, delta) {
    }

    public preload() {
        // load the game assets
        this.load.image('enemy1', '../../assets/enemy.png');
        this.load.image('bullet', '../../assets/bullet.png');
        this.load.image('towertop0', '../../assets/towertop0.png');
        this.load.image('towertop1', '../../assets/towertop1.png');
        this.load.image('towermid', '../../assets/towermid.png');
        this.load.image('towerbase', '../../assets/towerbase.png');
        this.load.spritesheet('tileset',
            'assets/tileset.png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }

    getActiveScene() {
        return this.scenes[this.activeSceneIndex]
    }
}