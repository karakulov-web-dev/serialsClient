import Model from "./Model";

export default class AppModel extends Model {
  constructor() {
    super();
    if (typeof AppModel.cache !== "undefined") {
      return AppModel.cache;
    }

    let App = this.createInstance("App");
    App.createValue("route", "/home");

    let serialList = this.createInstance("serialList");
    serialList.createValue("list", []);
          serialList.createValue("focusPosition", 0);
          serialList.createValue("scrolPosition", 0);
          serialList.createValue("display", function() {
      let list = serialList.getValue("list");
      let scrolPosition = serialList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });
    serialList.createValue("filtersReq", {
      genre: ['фантастические']
    })
      

    let seasonList = this.createInstance("seasonList");
    seasonList.createValue("list", []);
    seasonList.createValue("focusPosition", 0);
    seasonList.createValue("scrolPosition", 0);
    seasonList.createValue("display", function() {
      let list = seasonList.getValue("list");
      let scrolPosition = seasonList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let seriesList = this.createInstance("seriesList");
    seriesList.createValue("list", []);
    seriesList.createValue("focusPosition", 0);
    seriesList.createValue("scrolPosition", 0);
    seriesList.createValue("display", function() {
      let list = seriesList.getValue("list");
      let scrolPosition = seriesList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let video = this.createInstance("video");
    video.createValue("list", []);
    video.createValue("focusPosition", 0);
    video.createValue("totalResults", 0);
    video.createValue("scrolPosition", 0);
    video.createValue("nextPageToken", false);
    video.createValue("display", function() {
      let list = video.getValue("list");
      let scrolPosition = video.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });

    let PlayInstance = this.createInstance("Play");
    PlayInstance.createValue("timeShiftSize", {
      name: "10 сек",
      value: 10,
      command: "changetimeShiftSize",
    })
    PlayInstance.createValue("loadingWheel", false)
    PlayInstance.createValue("progress", {play:0 , duration: 100})
    PlayInstance.createValue("status", false)
    PlayInstance.createValue("visibleControlBar", false)
    PlayInstance.createValue("volume", 100)
    PlayInstance.createValue("name", "")
    PlayInstance.createValue("timeBar", {
      playSec: 0,
      durationSec: 0
    })





    let playListsList = this.createInstance("playListsList");
    playListsList.createValue("list", []);
    playListsList.createValue("focusPosition", 0);
    playListsList.createValue("scrolPosition", 0);
    playListsList.createValue("display", function() {
      let list = playListsList.getValue("list");
      let scrolPosition = playListsList.getValue("scrolPosition");
      list = list.get();
      scrolPosition = scrolPosition.get();
      let maxPosition = scrolPosition + 8;
      var i = 0;
      return list.filter(item => {
        let status = false;
        if (i >= scrolPosition && i <= maxPosition) {
          status = true;
        }
        i++;
        return status;
      });
    });


    let settingMenuInstance = PlayInstance.createInstance("settingMenu")
    settingMenuInstance.createValue('visible', false)
    settingMenuInstance.createValue('list', [])
    settingMenuInstance.createValue('mainList', [
      //{ name: "Качество", active: true, command: "openQualityList" },
      { name: "Громкость",active: true,  command: "openVolumeList" }
    ])
    settingMenuInstance.createValue('displayType', 'main')
    settingMenuInstance.createValue('qualityList', [])
    settingMenuInstance.createValue('volumeList', [
      {
        name: "100%",
        active: true,
        command: "changeVolume"
      },
      {
        name: "80%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "60%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "50%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "30%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "20%",
        active: false,
        command: "changeVolume"
      },
      {
        name: "0%",
        active: false,
        command: "changeVolume"
      }
  ])




    let ExitMenuInstance = this.createInstance("ExitMenuInstance");
    ExitMenuInstance.createValue("config", {
      text: "Вы дейстивтельно хотите выйти?",
      list: [
        {
          name: "Да",
          command: "exit",
          active: true
        },
        {
          name: "Отмена",
          command: "cancel",
          active: false
        }
      ]
    })


    AppModel.cache = this;
  }
  static cache: AppModel;
}
