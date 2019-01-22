var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Polyfill/bindSimplePolyfill", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function default_1() {
        // bind - simple polyfill
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (context /* ...args */) {
                var fn = this;
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof fn !== "function") {
                    throw new TypeError("Function.prototype.bind - context must be a valid function");
                }
                return function () {
                    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
                };
            };
        }
    }
    exports["default"] = default_1;
});
define("Model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Model = /** @class */ (function () {
        function Model(instance) {
            if (Model.model && !instance) {
                return Model.model;
            }
        }
        Model.prototype.createInstance = function (name) {
            if (typeof this[name] !== "undefined") {
                throw new Error("Instance " + name + " already exists");
            }
            this[name] = new Model(true);
            return this[name];
        };
        Model.prototype.getInstance = function (name) {
            if (typeof this[name] === "undefined") {
                throw new Error("Instance " + name + " undefined");
            }
            return this[name];
        };
        Model.prototype.getValue = function (key) {
            if (typeof this[key] === "undefined") {
                throw new Error("Value " + key + " undefined");
            }
            return this[key];
        };
        Model.prototype.createValue = function (key, value) {
            var self = this;
            this[key] = {
                value: value,
                set: function (value) {
                    this.value = value;
                    this.sendToSubscribers();
                },
                get: function () {
                    return this.value;
                },
                subscribe: function (obj) {
                    var subscribeList = this.subscribeList;
                    var app = document.getElementById("app");
                    subscribeList.forEach(function (item) {
                        var status = self.checkMountDOM(item.wrap, app);
                        if (status) {
                            var index = subscribeList.indexOf(item);
                            subscribeList.splice(index, 1);
                        }
                    });
                    subscribeList.push(obj);
                },
                clear: function (obj) {
                    var index = this.subscribeList.indexOf(obj);
                    if (index !== -1) {
                        this.subscribeList.splice(index, 1);
                    }
                },
                subscribeList: [],
                sendToSubscribers: function () {
                    this.subscribeList.forEach(function (obj) {
                        obj.render();
                    });
                }
            };
        };
        Model.prototype.checkMountDOM = function (elem, stopElem) {
            var status;
            this.parentIsNull(elem, stopElem, function (value) {
                status = value;
            });
            return status;
        };
        Model.prototype.parentIsNull = function (elem, stopElem, cb) {
            if (elem.parentNode === null) {
                cb(true);
                return true;
            }
            if (elem.parentNode === stopElem) {
                cb(false);
                return false;
            }
            this.parentIsNull(elem.parentNode, stopElem, cb);
        };
        return Model;
    }());
    exports["default"] = Model;
});
define("AppModel", ["require", "exports", "Model"], function (require, exports, Model_1) {
    "use strict";
    exports.__esModule = true;
    var AppModel = /** @class */ (function (_super) {
        __extends(AppModel, _super);
        function AppModel() {
            var _this = _super.call(this) || this;
            if (typeof AppModel.cache !== "undefined") {
                return AppModel.cache;
            }
            var App = _this.createInstance("App");
            App.createValue("route", "/home");
            var serialList = _this.createInstance("serialList");
            serialList.createValue("list", []);
            serialList.createValue("focusPosition", 0);
            serialList.createValue("scrolPosition", 0);
            serialList.createValue("display", function () {
                var list = serialList.getValue("list");
                var scrolPosition = serialList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var seasonList = _this.createInstance("seasonList");
            seasonList.createValue("list", []);
            seasonList.createValue("focusPosition", 0);
            seasonList.createValue("scrolPosition", 0);
            seasonList.createValue("display", function () {
                var list = seasonList.getValue("list");
                var scrolPosition = seasonList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var seriesList = _this.createInstance("seriesList");
            seriesList.createValue("list", []);
            seriesList.createValue("focusPosition", 0);
            seriesList.createValue("scrolPosition", 0);
            seriesList.createValue("display", function () {
                var list = seriesList.getValue("list");
                var scrolPosition = seriesList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var video = _this.createInstance("video");
            video.createValue("list", []);
            video.createValue("focusPosition", 0);
            video.createValue("totalResults", 0);
            video.createValue("scrolPosition", 0);
            video.createValue("nextPageToken", false);
            video.createValue("display", function () {
                var list = video.getValue("list");
                var scrolPosition = video.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var PlayInstance = _this.createInstance("Play");
            PlayInstance.createValue("timeShiftSize", {
                name: "10 сек",
                value: 10,
                command: "changetimeShiftSize"
            });
            PlayInstance.createValue("loadingWheel", false);
            PlayInstance.createValue("progress", { play: 0, duration: 100 });
            PlayInstance.createValue("status", false);
            PlayInstance.createValue("visibleControlBar", false);
            PlayInstance.createValue("volume", 50);
            PlayInstance.createValue("name", "");
            PlayInstance.createValue("timeBar", {
                playSec: 0,
                durationSec: 0
            });
            var playListsList = _this.createInstance("playListsList");
            playListsList.createValue("list", []);
            playListsList.createValue("focusPosition", 0);
            playListsList.createValue("scrolPosition", 0);
            playListsList.createValue("display", function () {
                var list = playListsList.getValue("list");
                var scrolPosition = playListsList.getValue("scrolPosition");
                list = list.get();
                scrolPosition = scrolPosition.get();
                var maxPosition = scrolPosition + 8;
                var i = 0;
                return list.filter(function (item) {
                    var status = false;
                    if (i >= scrolPosition && i <= maxPosition) {
                        status = true;
                    }
                    i++;
                    return status;
                });
            });
            var settingMenuInstance = PlayInstance.createInstance("settingMenu");
            settingMenuInstance.createValue('visible', false);
            settingMenuInstance.createValue('list', []);
            settingMenuInstance.createValue('mainList', [
                { name: "Качество", active: true, command: "openQualityList" },
                { name: "Интервал перемотки", command: "openTimeShiftSize" },
            ]);
            settingMenuInstance.createValue('displayType', 'main');
            settingMenuInstance.createValue('qualityList', []);
            var ExitMenuInstance = _this.createInstance("ExitMenuInstance");
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
            });
            AppModel.cache = _this;
            return _this;
        }
        return AppModel;
    }(Model_1["default"]));
    exports["default"] = AppModel;
});
define("Components/BaseComponent", ["require", "exports", "AppModel"], function (require, exports, AppModel_1) {
    "use strict";
    exports.__esModule = true;
    var BaseComponent = /** @class */ (function () {
        function BaseComponent() {
            this.wrap = document.createElement("div");
            this.model = new AppModel_1["default"]();
        }
        BaseComponent.prototype.render = function (elem) {
            if (typeof elem !== "undefined") {
                elem.innerHTML = "";
                elem.appendChild(this.wrap);
            }
            var content = this.create();
            this.wrap.innerHTML = "";
            this.wrap.appendChild(content);
        };
        BaseComponent.prototype.create = function () {
            var elem = document.createElement("div");
            return elem;
        };
        return BaseComponent;
    }());
    exports["default"] = BaseComponent;
});
define("Components/HeaderComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_1) {
    "use strict";
    exports.__esModule = true;
    var HeaderComponent = /** @class */ (function (_super) {
        __extends(HeaderComponent, _super);
        function HeaderComponent(breadcrumbs) {
            var _this = _super.call(this) || this;
            _this.breadcrumbs = breadcrumbs;
            return _this;
        }
        HeaderComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HeaderComponent";
            var p = document.createElement("p");
            if (this.breadcrumbs) {
                p.innerHTML = this.breadcrumbs;
                p.className = "app_HeaderComponent_breadcrumbs";
                elem.appendChild(p);
            }
            var img = document.createElement("img");
            img.className = "app_HeaderComponent_img";
            img.src = "http://seasonvar.ru/tpl/asset/img/top.logo.png";
            elem.appendChild(img);
            return elem;
        };
        return HeaderComponent;
    }(BaseComponent_1["default"]));
    exports["default"] = HeaderComponent;
});
define("Components/ListComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_2) {
    "use strict";
    exports.__esModule = true;
    var ListComponent = /** @class */ (function (_super) {
        __extends(ListComponent, _super);
        function ListComponent(instanceName, classNameConfig) {
            var _this = _super.call(this) || this;
            _this.instance = _this.model.getInstance(instanceName);
            _this.list = _this.instance.getValue("display").get();
            _this.focusPosition = _this.instance.getValue("focusPosition");
            _this.classNameConfig = classNameConfig;
            var subscribeArr = [
                _this.instance.getValue("scrolPosition"),
                _this.instance.getValue("focusPosition"),
                _this.instance.getValue("display"),
                _this.instance.getValue("list")
            ];
            subscribeArr.forEach(function (item) {
                item.subscribe(_this);
            });
            return _this;
        }
        ListComponent.prototype.create = function () {
            var _this = this;
            var elem = document.createElement("div");
            elem.className = this.classNameConfig.elemClassName;
            var list = this.list();
            list = JSON.parse(JSON.stringify(list));
            if (typeof list[this.focusPosition.get()] !== "undefined") {
                list[this.focusPosition.get()].active = true;
            }
            list.forEach(function (item) {
                var itemElem = _this.createItem(item);
                if (itemElem) {
                    elem.appendChild(itemElem);
                }
            });
            return elem;
        };
        ListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            if (typeof item.name === 'undefined') {
                title = item[0].name;
            }
            else {
                title = item.name;
            }
            if (typeof item.poster === 'undefined') {
                imgSrc = item[0].poster;
            }
            else {
                imgSrc = item.poster;
            }
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (typeof item.contentDetails !== 'undefined') {
                var duration = document.createElement("div");
                var dr = item.contentDetails.duration;
                var timetring = convertISO8601(dr);
                duration.innerHTML = "" + timetring;
                duration.className = "app_VideoListComponent_card_duration";
                card.appendChild(duration);
            }
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            h1.innerHTML = title;
            img.src = imgSrc;
            return wrap;
        };
        return ListComponent;
    }(BaseComponent_2["default"]));
    exports["default"] = ListComponent;
    function convertISO8601(input) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1])
                hours = Number(matches[1]);
            if (matches[2])
                minutes = Number(matches[2]);
            if (matches[3])
                seconds = Number(matches[3]);
            hours = hours ? hours + ":" : "";
            minutes = minutes ? minutes + ":" : "00:";
            seconds = seconds + "";
            if (hours) {
                minutes = minutes.length === 2 ? "0" + minutes : minutes;
            }
            if (minutes) {
                seconds = seconds.length === 1 ? "0" + seconds : seconds;
            }
            var timeString = "" + hours + minutes + seconds;
        }
        return (timeString);
    }
});
define("Components/ChannelListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_1) {
    "use strict";
    exports.__esModule = true;
    var ChannelListComponent = /** @class */ (function (_super) {
        __extends(ChannelListComponent, _super);
        function ChannelListComponent() {
            return _super.call(this, "serialList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        return ChannelListComponent;
    }(ListComponent_1["default"]));
    exports["default"] = ChannelListComponent;
});
define("Components/ButtonComponent", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_3) {
    "use strict";
    exports.__esModule = true;
    var ButtonComponent = /** @class */ (function (_super) {
        __extends(ButtonComponent, _super);
        function ButtonComponent(text, color, visible) {
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.text = text;
            _this.visible = visible;
            return _this;
        }
        ButtonComponent.prototype.create = function () {
            var button = document.createElement("div");
            if (!this.visible) {
                button.style.visibility = "hidden";
            }
            button.className =
                "app_BottomButton_button app_BottomButton_button_" + this.color;
            button.innerHTML = this.text;
            return button;
        };
        return ButtonComponent;
    }(BaseComponent_3["default"]));
    exports["default"] = ButtonComponent;
});
define("Components/BottomButtonComponent", ["require", "exports", "Components/BaseComponent", "Components/ButtonComponent"], function (require, exports, BaseComponent_4, ButtonComponent_1) {
    "use strict";
    exports.__esModule = true;
    var BottomButtonComponent = /** @class */ (function (_super) {
        __extends(BottomButtonComponent, _super);
        function BottomButtonComponent(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            return _this;
        }
        BottomButtonComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_BottomButtonComponent";
            var wrap1 = document.createElement("div");
            var wrap2 = document.createElement("div");
            var wrap3 = document.createElement("div");
            var wrap4 = document.createElement("div");
            wrap1.className = "app_BottomButton_wrap_button";
            wrap2.className = "app_BottomButton_wrap_button";
            wrap3.className = "app_BottomButton_wrap_button";
            wrap4.className = "app_BottomButton_wrap_button";
            var Button1 = new ButtonComponent_1["default"](this.config.red.text, "red", this.config.red.visible);
            var Button2 = new ButtonComponent_1["default"](this.config.green.text, "green", this.config.green.visible);
            var Button3 = new ButtonComponent_1["default"](this.config.yellow.text, "yellow", this.config.yellow.visible);
            var Button4 = new ButtonComponent_1["default"](this.config.blue.text, "blue", this.config.blue.visible);
            Button1.render(wrap1);
            Button2.render(wrap2);
            Button3.render(wrap3);
            Button4.render(wrap4);
            elem.appendChild(wrap1);
            elem.appendChild(wrap2);
            elem.appendChild(wrap3);
            elem.appendChild(wrap4);
            return elem;
        };
        return BottomButtonComponent;
    }(BaseComponent_4["default"]));
    exports["default"] = BottomButtonComponent;
});
define("Components/HomeComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/ChannelListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_5, HeaderComponent_1, ChannelListComponent_1, BottomButtonComponent_1) {
    "use strict";
    exports.__esModule = true;
    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [HeaderComponent_1["default"], ChannelListComponent_1["default"]];
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_1["default"]({
                red: {
                    text: "Фильтр",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: true
                },
                yellow: {
                    text: "Поиск",
                    visible: true
                },
                blue: {
                    text: "Сортировать",
                    visible: true
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return HomeComponent;
    }(BaseComponent_5["default"]));
    exports["default"] = HomeComponent;
});
define("Components/SeasonListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_2) {
    "use strict";
    exports.__esModule = true;
    var SeasonListComponent = /** @class */ (function (_super) {
        __extends(SeasonListComponent, _super);
        function SeasonListComponent() {
            return _super.call(this, "seasonList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        SeasonListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            title = item.name + " (" + item.season_number + " сезон)";
            imgSrc = item.poster;
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (typeof item.contentDetails !== 'undefined') {
                var duration = document.createElement("div");
                var dr = item.contentDetails.duration;
                var timetring = convertISO8601(dr);
                duration.innerHTML = "" + timetring;
                duration.className = "app_VideoListComponent_card_duration";
                card.appendChild(duration);
            }
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            h1.innerHTML = title;
            img.src = imgSrc;
            return wrap;
        };
        return SeasonListComponent;
    }(ListComponent_2["default"]));
    exports["default"] = SeasonListComponent;
    function convertISO8601(input) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1])
                hours = Number(matches[1]);
            if (matches[2])
                minutes = Number(matches[2]);
            if (matches[3])
                seconds = Number(matches[3]);
            hours = hours ? hours + ":" : "";
            minutes = minutes ? minutes + ":" : "00:";
            seconds = seconds + "";
            if (hours) {
                minutes = minutes.length === 2 ? "0" + minutes : minutes;
            }
            if (minutes) {
                seconds = seconds.length === 1 ? "0" + seconds : seconds;
            }
            var timeString = "" + hours + minutes + seconds;
        }
        return (timeString);
    }
});
define("Components/SeasonsComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/SeasonListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_6, HeaderComponent_2, SeasonListComponent_1, BottomButtonComponent_2) {
    "use strict";
    exports.__esModule = true;
    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [HeaderComponent_2["default"], SeasonListComponent_1["default"]];
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_2["default"]({
                red: {
                    text: "Фильтр",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: true
                },
                yellow: {
                    text: "Поиск",
                    visible: true
                },
                blue: {
                    text: "Сортировать",
                    visible: true
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return HomeComponent;
    }(BaseComponent_6["default"]));
    exports["default"] = HomeComponent;
});
define("Components/SeriesListComponent", ["require", "exports", "Components/ListComponent"], function (require, exports, ListComponent_3) {
    "use strict";
    exports.__esModule = true;
    var SeriesListComponent = /** @class */ (function (_super) {
        __extends(SeriesListComponent, _super);
        function SeriesListComponent() {
            return _super.call(this, "seriesList", {
                elemClassName: "app_ChannelListComponent",
                wrapClassName: "app_ChannelListComponent_wrap_elem",
                cardClassName: "app_ChannelListComponent_card",
                wrapActiveClassName: "app_ChannelListComponent_wrap_elem active",
                imgClassName: "app_ChannelListComponent_card_img",
                h1ClassName: "app_ChannelListComponent_card_h1"
            }) || this;
        }
        SeriesListComponent.prototype.createItem = function (item) {
            var title;
            var imgSrc;
            title = item.name;
            imgSrc = item.poster;
            var wrap = document.createElement("div");
            var card = document.createElement("div");
            var img = document.createElement("img");
            var h1 = document.createElement("h1");
            wrap.className = this.classNameConfig.wrapClassName;
            card.className = this.classNameConfig.cardClassName;
            img.className = this.classNameConfig.imgClassName;
            h1.className = this.classNameConfig.h1ClassName;
            if (item.active) {
                wrap.className = this.classNameConfig.wrapActiveClassName;
            }
            wrap.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            if (typeof item.contentDetails !== 'undefined') {
                var duration = document.createElement("div");
                var dr = item.contentDetails.duration;
                var timetring = convertISO8601(dr);
                duration.innerHTML = "" + timetring;
                duration.className = "app_VideoListComponent_card_duration";
                card.appendChild(duration);
            }
            if (title.length > 50) {
                title = title.split("");
                title.length = title.length = 90;
                title = title.join("");
                title = title + "...";
            }
            h1.innerHTML = title;
            img.src = imgSrc;
            return wrap;
        };
        return SeriesListComponent;
    }(ListComponent_3["default"]));
    exports["default"] = SeriesListComponent;
    function convertISO8601(input) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;
        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1])
                hours = Number(matches[1]);
            if (matches[2])
                minutes = Number(matches[2]);
            if (matches[3])
                seconds = Number(matches[3]);
            hours = hours ? hours + ":" : "";
            minutes = minutes ? minutes + ":" : "00:";
            seconds = seconds + "";
            if (hours) {
                minutes = minutes.length === 2 ? "0" + minutes : minutes;
            }
            if (minutes) {
                seconds = seconds.length === 1 ? "0" + seconds : seconds;
            }
            var timeString = "" + hours + minutes + seconds;
        }
        return (timeString);
    }
});
define("Components/SeriesComponent", ["require", "exports", "Components/BaseComponent", "Components/HeaderComponent", "Components/SeriesListComponent", "Components/BottomButtonComponent"], function (require, exports, BaseComponent_7, HeaderComponent_3, SeriesListComponent_1, BottomButtonComponent_3) {
    "use strict";
    exports.__esModule = true;
    var HomeComponent = /** @class */ (function (_super) {
        __extends(HomeComponent, _super);
        function HomeComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeComponent.prototype.create = function () {
            var elem = document.createElement("div");
            elem.className = "app_HomeComponent";
            var compList = [HeaderComponent_3["default"], SeriesListComponent_1["default"]];
            compList.forEach(function (Comp) {
                var wrap = document.createElement("div");
                var comp = new Comp();
                elem.appendChild(wrap);
                comp.render(wrap);
            });
            var bottomBtnComp = new BottomButtonComponent_3["default"]({
                red: {
                    text: "Фильтр",
                    visible: true
                },
                green: {
                    text: "Инфо",
                    visible: true
                },
                yellow: {
                    text: "Поиск",
                    visible: true
                },
                blue: {
                    text: "Сортировать",
                    visible: true
                }
            });
            var btnWrap = document.createElement("div");
            elem.appendChild(btnWrap);
            bottomBtnComp.render(btnWrap);
            return elem;
        };
        return HomeComponent;
    }(BaseComponent_7["default"]));
    exports["default"] = HomeComponent;
});
define("Components/LoadingWheel", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_8) {
    "use strict";
    exports.__esModule = true;
    var LoadingWheel = /** @class */ (function (_super) {
        __extends(LoadingWheel, _super);
        function LoadingWheel() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.loadingWheel = _this.instancePlay.getValue("loadingWheel");
            _this.loadingWheel.subscribe(_this);
            return _this;
        }
        LoadingWheel.prototype.create = function () {
            var loadingWheelStatus = this.loadingWheel.get();
            var div = document.createElement("div");
            if (!loadingWheelStatus) {
                return div;
            }
            div.className = "app_Play_loadingWheel_img_container";
            var img = document.createElement("img");
            div.appendChild(img);
            img.className = "app_Play_loadingWheel_img";
            img.src = "./img/loading.gif";
            return div;
        };
        return LoadingWheel;
    }(BaseComponent_8["default"]));
    exports["default"] = LoadingWheel;
});
define("Components/ControlBar", ["require", "exports", "Components/BaseComponent"], function (require, exports, BaseComponent_9) {
    "use strict";
    exports.__esModule = true;
    var ControlBar = /** @class */ (function (_super) {
        __extends(ControlBar, _super);
        function ControlBar() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.visibleControlBar = _this.instancePlay.getValue("visibleControlBar");
            _this.visibleControlBar.subscribe(_this);
            return _this;
        }
        ControlBar.prototype.create = function () {
            var div = document.createElement("div");
            var visibleControlBar = this.visibleControlBar.get();
            if (!visibleControlBar) {
                return div;
            }
            var box = document.createElement("div");
            div.className = "app_Play_ControlBar";
            box.className = "app_Play_ControlBar_box";
            div.appendChild(box);
            var progress_blank_wrap = document.createElement("div");
            var progress_play_wrap = document.createElement("div");
            var playButton_wrap = document.createElement("div");
            var settingButton_wrap = document.createElement("div");
            var volumeBar_wrap = document.createElement("div");
            var nameCurrentVideo_wrap = document.createElement("div");
            var timeBar_wrap = document.createElement("div");
            var playSettingMenu_wrap = document.createElement("div");
            var timeShiftSizeBar_wrap = document.createElement("div");
            box.appendChild(progress_blank_wrap);
            box.appendChild(progress_play_wrap);
            box.appendChild(playButton_wrap);
            box.appendChild(settingButton_wrap);
            box.appendChild(volumeBar_wrap);
            box.appendChild(nameCurrentVideo_wrap);
            box.appendChild(timeBar_wrap);
            box.appendChild(playSettingMenu_wrap);
            box.appendChild(timeShiftSizeBar_wrap);
            var controlBar_progress_blank = new ControlBar_progress_blank();
            var controlBar_progress_play = new ControlBar_progress_play();
            var controlBar_playButton = new ControlBar_playButton();
            var controlBar_settingButton = new ControlBar_settingButton();
            var controlBar_volumeBar = new ControlBar_volumeBar();
            var controlBar_nameCurrentVideo = new ControlBar_nameCurrentVideo();
            var controlBar_timeBar = new ControlBar_timeBar();
            var controlBar_playSettingMenu = new ControlBar_playSettingMenu();
            var controlBar_timeShiftSizeBar = new ControlBar_timeShiftSizeBar();
            controlBar_progress_blank.render(progress_blank_wrap);
            controlBar_progress_play.render(progress_play_wrap);
            controlBar_playButton.render(playButton_wrap);
            controlBar_settingButton.render(settingButton_wrap);
            controlBar_volumeBar.render(volumeBar_wrap);
            controlBar_nameCurrentVideo.render(nameCurrentVideo_wrap);
            controlBar_timeBar.render(timeBar_wrap);
            controlBar_playSettingMenu.render(playSettingMenu_wrap);
            controlBar_timeShiftSizeBar.render(timeShiftSizeBar_wrap);
            return div;
        };
        return ControlBar;
    }(BaseComponent_9["default"]));
    exports["default"] = ControlBar;
    var ControlBar_progress_blank = /** @class */ (function (_super) {
        __extends(ControlBar_progress_blank, _super);
        function ControlBar_progress_blank() {
            return _super.call(this) || this;
        }
        ControlBar_progress_blank.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_box_progress_blank";
            return div;
        };
        return ControlBar_progress_blank;
    }(BaseComponent_9["default"]));
    var ControlBar_progress_play = /** @class */ (function (_super) {
        __extends(ControlBar_progress_play, _super);
        function ControlBar_progress_play() {
            var _this = _super.call(this) || this;
            _this.instancePlay = _this.model.getInstance("Play");
            _this.progress = _this.instancePlay.getValue("progress");
            _this.progress.subscribe(_this);
            return _this;
        }
        ControlBar_progress_play.prototype.create = function () {
            var progress = this.progress.get();
            progress = progress.play;
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_box_progress_play";
            div.style.width = progress + "%";
            return div;
        };
        return ControlBar_progress_play;
    }(BaseComponent_9["default"]));
    var ControlBar_playButton = /** @class */ (function (_super) {
        __extends(ControlBar_playButton, _super);
        function ControlBar_playButton() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.status = _this.Play.getValue("status");
            _this.status.subscribe(_this);
            return _this;
        }
        ControlBar_playButton.prototype.create = function () {
            var status = this.status.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_playButton";
            if (status === "play") {
                div.style.background =
                    "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
            }
            else if (status === "pause") {
                div.style.background =
                    "url(./img/baseline_play_circle_outline_white_18dp.png) no-repeat";
            }
            else {
                div.style.background =
                    "url(./img/baseline_pause_circle_outline_white_18dp.png) no-repeat";
            }
            return div;
        };
        return ControlBar_playButton;
    }(BaseComponent_9["default"]));
    var ControlBar_settingButton = /** @class */ (function (_super) {
        __extends(ControlBar_settingButton, _super);
        function ControlBar_settingButton() {
            return _super.call(this) || this;
        }
        ControlBar_settingButton.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_settingButton";
            return div;
        };
        return ControlBar_settingButton;
    }(BaseComponent_9["default"]));
    var ControlBar_volumeBar = /** @class */ (function (_super) {
        __extends(ControlBar_volumeBar, _super);
        function ControlBar_volumeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.volume = _this.Play.getValue("volume");
            _this.volume.subscribe(_this);
            return _this;
        }
        ControlBar_volumeBar.prototype.create = function () {
            var volume = this.volume.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_volumeBar";
            var icon = document.createElement("div");
            var line = document.createElement("div");
            var lineBlank = document.createElement("div");
            icon.className = "app_Play_ControlBar_volumeBar_icon";
            if (volume === 0) {
                icon.style.background =
                    "url(./img/baseline_volume_off_white_18dp.png) no-repeat";
            }
            else if (volume < 50) {
                icon.style.background =
                    "url(./img/baseline_volume_down_white_18dp.png) no-repeat";
            }
            else {
                icon.style.background =
                    "url(./img/baseline_volume_up_white_18dp.png) no-repeat";
            }
            div.appendChild(icon);
            lineBlank.className = "app_Play_ControlBar_volumeBar_lineBlank";
            div.appendChild(lineBlank);
            line.className = "app_Play_ControlBar_volumeBar_line";
            line.style.width = volume + "%";
            lineBlank.appendChild(line);
            return div;
        };
        return ControlBar_volumeBar;
    }(BaseComponent_9["default"]));
    var ControlBar_nameCurrentVideo = /** @class */ (function (_super) {
        __extends(ControlBar_nameCurrentVideo, _super);
        function ControlBar_nameCurrentVideo() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.name = _this.Play.getValue("name");
            _this.name.subscribe(_this);
            return _this;
        }
        ControlBar_nameCurrentVideo.prototype.create = function () {
            var name = this.name.get();
            var div = document.createElement("div");
            div.className = "app_Play_ControlBar_nameCurrentVideo";
            var p = document.createElement("p");
            p.innerHTML = name;
            div.appendChild(p);
            return div;
        };
        return ControlBar_nameCurrentVideo;
    }(BaseComponent_9["default"]));
    var ControlBar_timeBar = /** @class */ (function (_super) {
        __extends(ControlBar_timeBar, _super);
        function ControlBar_timeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.timeBar = _this.Play.getValue("timeBar");
            _this.timeBar.subscribe(_this);
            return _this;
        }
        ControlBar_timeBar.prototype.create = function () {
            var progress = this.timeBar.get();
            var current = progress.playSec;
            var duration = progress.durationSec;
            var p = document.createElement("p");
            p.className = "app_Play_ControlBar_timeBar";
            p.innerHTML =
                this.secTimeString(current) + "/" + this.secTimeString(duration);
            return p;
        };
        ControlBar_timeBar.prototype.secTimeString = function (secTime) {
            var sec = Math.floor(secTime % 60);
            var min = Math.floor(secTime / 60);
            var h = Math.floor(min / 60);
            min = Math.floor(min % 60);
            var hCopy = h;
            h = String(h);
            sec = String(sec);
            min = String(min);
            if (sec.length === 1) {
                sec = "0" + sec;
            }
            if (min.length === 1) {
                min = "0" + min;
            }
            var timeString = min + ":" + sec;
            if (hCopy >= 1) {
                timeString = h + ":" + timeString;
            }
            return timeString;
        };
        return ControlBar_timeBar;
    }(BaseComponent_9["default"]));
    var ControlBar_playSettingMenu = /** @class */ (function (_super) {
        __extends(ControlBar_playSettingMenu, _super);
        function ControlBar_playSettingMenu() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.settingMenu = _this.Play.getInstance("settingMenu");
            _this.settingMenuVisible = _this.settingMenu.getValue("visible");
            _this.settingMenuList = _this.settingMenu.getValue("list");
            _this.settingMenuList.subscribe(_this);
            _this.settingMenuVisible.subscribe(_this);
            return _this;
        }
        ControlBar_playSettingMenu.prototype.create = function () {
            var _this = this;
            var div = document.createElement("div");
            var visible = this.settingMenuVisible.get();
            if (!visible) {
                return div;
            }
            div.className = "app_Play_ControlBar_playSettingMenu";
            var list = this.settingMenuList.get();
            list.forEach(function (item) {
                var itemElem = _this.createItemList(item);
                div.appendChild(itemElem);
            });
            return div;
        };
        ControlBar_playSettingMenu.prototype.createItemList = function (item) {
            var p = document.createElement("p");
            p.innerHTML = item.name;
            if (item.active) {
                p.className = "app_Play_ControlBar_playSettingMenu_item active";
            }
            else {
                p.className = "app_Play_ControlBar_playSettingMenu_item";
            }
            return p;
        };
        return ControlBar_playSettingMenu;
    }(BaseComponent_9["default"]));
    var ControlBar_timeShiftSizeBar = /** @class */ (function (_super) {
        __extends(ControlBar_timeShiftSizeBar, _super);
        function ControlBar_timeShiftSizeBar() {
            var _this = _super.call(this) || this;
            _this.Play = _this.model.getInstance("Play");
            _this.timeShiftSize = _this.Play.getValue("timeShiftSize");
            _this.timeShiftSize.subscribe(_this);
            return _this;
        }
        ControlBar_timeShiftSizeBar.prototype.create = function () {
            var timeShiftSize = this.timeShiftSize.get();
            var div = document.createElement("div");
            div.className = 'app_Play_ControlBar_timeShiftSizeBar';
            var p = document.createElement("p");
            div.appendChild(p);
            p.innerHTML = timeShiftSize.name;
            var twotone_arrow_drop_down_white_24dp = document.createElement("span");
            var twotone_arrow_drop_up_white_24dp = document.createElement("span");
            twotone_arrow_drop_down_white_24dp.className = "twotone_arrow_drop_down_white_24dp";
            twotone_arrow_drop_up_white_24dp.className = "twotone_arrow_drop_up_white_24dp";
            div.appendChild(twotone_arrow_drop_down_white_24dp);
            div.appendChild(twotone_arrow_drop_up_white_24dp);
            return div;
        };
        return ControlBar_timeShiftSizeBar;
    }(BaseComponent_9["default"]));
});
define("Components/PlayComponent", ["require", "exports", "Components/BaseComponent", "Components/LoadingWheel", "Components/ControlBar"], function (require, exports, BaseComponent_10, LoadingWheel_1, ControlBar_1) {
    "use strict";
    exports.__esModule = true;
    var PlayComponent = /** @class */ (function (_super) {
        __extends(PlayComponent, _super);
        function PlayComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayComponent.prototype.create = function () {
            var div = document.createElement("div");
            div.className = "app_Play";
            var controlBarWrap = document.createElement("div");
            var loadingWheelWrap = document.createElement("div");
            var pauseIndicatorWrap = document.createElement("div");
            div.appendChild(loadingWheelWrap);
            div.appendChild(controlBarWrap);
            div.appendChild(pauseIndicatorWrap);
            var loadingWheel = new LoadingWheel_1["default"]();
            var controlBar = new ControlBar_1["default"]();
            var pauseIndicator = new PauseIndicator();
            loadingWheel.render(loadingWheelWrap);
            controlBar.render(controlBarWrap);
            pauseIndicator.render(pauseIndicatorWrap);
            return div;
        };
        return PlayComponent;
    }(BaseComponent_10["default"]));
    exports["default"] = PlayComponent;
    var PauseIndicator = /** @class */ (function (_super) {
        __extends(PauseIndicator, _super);
        function PauseIndicator() {
            var _this = _super.call(this) || this;
            var model = _this.model;
            model.Play.status.subscribe(_this);
            return _this;
        }
        PauseIndicator.prototype.create = function () {
            var model = this.model;
            var div = document.createElement("div");
            if ((model.Play.status.get()) !== "pause") {
                return div;
            }
            div.className = "app_Play_PauseIndicator";
            return div;
        };
        return PauseIndicator;
    }(BaseComponent_10["default"]));
});
define("Components/PageRouter", ["require", "exports", "Components/BaseComponent", "Components/HomeComponent", "Components/SeasonsComponent", "Components/SeriesComponent", "Components/PlayComponent"], function (require, exports, BaseComponent_11, HomeComponent_1, SeasonsComponent_1, SeriesComponent_1, PlayComponent_1) {
    "use strict";
    exports.__esModule = true;
    var PageRouter = /** @class */ (function (_super) {
        __extends(PageRouter, _super);
        function PageRouter() {
            var _this = _super.call(this) || this;
            var model = _this.model;
            var self = _this;
            var App = model.getInstance("App");
            var route = App.getValue("route");
            route.subscribe(self);
            return _this;
        }
        PageRouter.prototype.create = function () {
            var elem = document.createElement("div");
            var App = this.model.getInstance("App");
            var route = App.getValue("route");
            route = route.get();
            route = route.split("/");
            route = "/" + route[1];
            var page;
            if (route === "/home") {
                page = new HomeComponent_1["default"]();
            }
            else if (route === '/seasonList') {
                page = new SeasonsComponent_1["default"]();
            }
            else if (route === '/seriesList') {
                page = new SeriesComponent_1["default"]();
            }
            else if (route === '/play') {
                page = new PlayComponent_1["default"]();
            }
            page.render(elem);
            return elem;
        };
        return PageRouter;
    }(BaseComponent_11["default"]));
    exports["default"] = PageRouter;
});
define("ListController", ["require", "exports", "AppModel"], function (require, exports, AppModel_2) {
    "use strict";
    exports.__esModule = true;
    var ListController = /** @class */ (function () {
        function ListController(instanceModel) {
            this.model = new AppModel_2["default"]();
            this.instanceModel = instanceModel;
            this.focusPosition = this.instanceModel.getValue("focusPosition");
            this.scrolPosition = this.instanceModel.getValue("scrolPosition");
            this.display = this.instanceModel.getValue("display");
            this.list = this.instanceModel.getValue("list");
        }
        ListController.prototype.rigthFocusPosition = function () {
            var scrolPosition = this.scrolPosition.get();
            var activePosition = this.focusPosition.get();
            if (activePosition < 5) {
                if (typeof this.display.get()()[activePosition + 1] !== 'undefined') {
                    this.focusPosition.set(activePosition + 1);
                }
            }
            else if (activePosition === 5 && activePosition !== this.display.get()().length - 1) {
                this.scrolPosition.set(scrolPosition + 6);
                this.focusPosition.set(0);
            }
            if (this.display.get()().length > 5) {
                this.infiniteScroll();
            }
        };
        ListController.prototype.leftFocusPosition = function () {
            var scrolPosition = this.scrolPosition.get();
            var minScrolPosition = 0;
            var activePosition = this.focusPosition.get();
            if (scrolPosition <= 0 && activePosition === 0) {
                return;
            }
            if (activePosition <= minScrolPosition) {
                this.scrolPosition.set(scrolPosition - 6);
                this.focusPosition.set(5);
                return;
            }
            this.focusPosition.set(activePosition - 1);
        };
        ;
        ListController.prototype.upFocusPosition = function () {
            var length = this.list.get().length;
            var scrolPosition = this.scrolPosition.get();
            var minScrolPosition = 0;
            var activePosition = this.focusPosition.get();
            if (scrolPosition <= 0 && activePosition < 3) {
                return;
            }
            if (activePosition < 3) {
                var newScrolPosition = scrolPosition - 6;
                if (newScrolPosition < minScrolPosition) {
                    this.scrolPosition.set(minScrolPosition);
                }
                else {
                    this.scrolPosition.set(newScrolPosition);
                    this.focusPosition.set(activePosition + 3);
                }
                return;
            }
            this.focusPosition.set(activePosition - 3);
        };
        ;
        ListController.prototype.downFocusPosition = function () {
            var length = this.list.get().length;
            var scrolPosition = this.scrolPosition.get();
            var maxScrolPosition = length - 1;
            var activePosition = this.focusPosition.get();
            if (length <= scrolPosition + 6 && activePosition >= 3) {
                if (this.display.get()().length > 5) {
                    this.infiniteScroll();
                }
                return;
            }
            if (activePosition >= 3) {
                var newScrolPosition = scrolPosition + 6;
                if (newScrolPosition > maxScrolPosition) {
                    this.scrolPosition.set(maxScrolPosition);
                }
                else {
                    this.scrolPosition.set(newScrolPosition);
                    if (typeof this.display.get()()[activePosition - 3] !== 'undefined') {
                        this.focusPosition.set(activePosition - 3);
                    }
                    else {
                        this.focusPosition.set(this.display.get()().length - 1);
                    }
                }
                if (this.display.get()().length > 5) {
                    this.infiniteScroll();
                }
                return;
            }
            if (typeof this.display.get()()[activePosition + 3] !== 'undefined') {
                this.focusPosition.set(activePosition + 3);
            }
            if (this.display.get()().length > 5) {
                this.infiniteScroll();
            }
        };
        ;
        ListController.prototype.infiniteScroll = function () {
        };
        ListController.prototype.onEnter = function () {
        };
        return ListController;
    }());
    exports["default"] = ListController;
});
define("RouteManager", ["require", "exports", "AppModel"], function (require, exports, AppModel_3) {
    "use strict";
    exports.__esModule = true;
    var RouteManager = /** @class */ (function () {
        function RouteManager() {
            this.historyArr = [];
            if (typeof RouteManager.cache !== 'undefined') {
                return RouteManager.cache;
            }
            this.model = new AppModel_3["default"]();
            this.route = this.model.getInstance("App").getValue("route");
            RouteManager.cache = this;
        }
        RouteManager.prototype.set = function (route) {
            this.historyArr.push(this.route.get());
            this.route.set(route);
        };
        RouteManager.prototype.back = function () {
            var backLocation = this.historyArr.pop();
            this.route.set(backLocation);
        };
        RouteManager.prototype.home = function () {
            this.historyArr = [];
            this.route.set("/home");
            this.model.channels.focusPosition.set(0);
            this.model.channels.scrolPosition.set(0);
        };
        return RouteManager;
    }());
    exports["default"] = RouteManager;
});
define("Polyfill/Promise_simple", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function Promise_simple(f) {
        var returnCb = this.returnCb.bind(this);
        f(returnCb);
    }
    exports.Promise_simple = Promise_simple;
    Promise_simple.prototype.then = function (cb) {
        this.cb = cb;
    };
    Promise_simple.prototype.cb = function () { };
    Promise_simple.prototype.returnCb = function (q) {
        var self = this;
        setTimeout(function () {
            self.cb(q);
        }, 0);
    };
});
define("HTTP", ["require", "exports", "Polyfill/Promise_simple"], function (require, exports, Promise_simple_1) {
    "use strict";
    exports.__esModule = true;
    function getSeason(id) {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            resolve({
                "id": "3801",
                "poster": "http://cdn.seasonvar.ru/oblojka/3801.jpg",
                "poster_small": "http://cdn.seasonvar.ru/oblojka/small/3801.jpg",
                "season_number": "0",
                "name": "Пение птиц",
                "name_original": "Birdsong",
                "year": "2012",
                "genre": [
                    "драмы",
                    "исторические"
                ],
                "country": [
                    "Великобритания"
                ],
                "description": "В основе этого коротенького сериала лежит сюжет романа «Пение птиц» известного Британского писателя Чарльза Фолкса, который был написан в1993 году. В книге изложена биография Стивена Рейсфорда. Он делится со зрителем своими воспоминаниями, когда во время Первой мировой войны испытывал сильные любовные чувства к одной француженке. Но эта любовь была запретной.",
                "rating": {
                    "imdb": {
                        "ratio": "7.40",
                        "votes_count": "4862"
                    },
                    "kinopoisk": {
                        "ratio": "7.45",
                        "votes_count": "2092"
                    }
                },
                "playlist": [
                    {
                        "name": "1 серия",
                        "link": "http://data12-cdn.datalock.ru/fi2lm/7fb1bcc5ec91dc657d77778f954c754a/7f_Birdsong.E01.2012.DUAL.BDRip.XviD.AC3.-J.R.A.a1.03.12.12.mp4"
                    },
                    {
                        "name": "2 серия",
                        "link": "http://data09-cdn.datalock.ru/fi2lm/7fb1bcc5ec91dc657d77778f954c754a/7f_Birdsong.E02.2012.DUAL.BDRip.XviD.AC3.-J.R.A.a1.03.12.12.mp4"
                    }
                ]
            });
        });
    }
    exports.getSeason = getSeason;
    function getAllSerials() {
        return new Promise_simple_1.Promise_simple(function (resolve) {
            resolve([
                [{ id: 1,
                        poster: 'http://cdn.seasonvar.ru/oblojka/1.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/1.jpg',
                        season_number: 1,
                        name: '4400',
                        name_original: 'The 4400',
                        name_alternative: ['Четыре тысячи четыреста'],
                        year: '2004',
                        genre: ['фантастические'],
                        country: ['США'],
                        description: '4 тысячи 400 человек, которые непонятным образом исчезли в отдельные промежутки времени 20 столетия, вдруг очутились снова на земле, они появились точь-в-точь теми же, какими и исчезали. Государство берётся за дело, чтобы понять, где они были и почему они вернулись. Но ясно одно, что их присутствие запросто может поменять мир...',
                        rating: { imdb: '7.40', kinopoisk: '7.46' } },
                    { id: 2,
                        poster: 'http://cdn.seasonvar.ru/oblojka/2.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/2.jpg',
                        season_number: 2,
                        name: '4400',
                        name_original: 'The 4400',
                        name_alternative: ['Четыре тысячи четыреста'],
                        year: '2004',
                        genre: ['фантастические'],
                        country: ['США'],
                        description: 'Именно 4400 людей, о которых ни духу ни слуху не стало слышно в годы 20 века, но они снова на нашей планете, они не чуть не изменились. Но это серьёзно удивило высших чиновников, они тотчас же желают разобраться, что же происходило с этими необычными людьми. Ясно становится теперь, что эти люди в силах изменить всё вокруг...',
                        rating: { imdb: '7.40', kinopoisk: '7.46' } },
                    { id: 3,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3.jpg',
                        season_number: 3,
                        name: '4400',
                        name_original: 'The 4400',
                        name_alternative: ['Четыре тысячи четыреста'],
                        year: '2006',
                        genre: ['фантастические'],
                        country: ['США'],
                        description: 'Загадочно то, что четыре тысячи четыреста людей пропадали в течение всего 20 столетия, а потом они спустя время оказываются снова на земле, они не состарились, они такие, какими были в момент пропажи. Правительству приходится начинать розыск людей с целью выяснения, кто же они такие, почему они снова вернулись. Не за горами то время, когда все поймут, что они могут поменять устои этого мира...',
                        rating: { imdb: '7.40', kinopoisk: '7.46' } },
                    { id: 4,
                        poster: 'http://cdn.seasonvar.ru/oblojka/4.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/4.jpg',
                        season_number: 4,
                        name: '4400',
                        name_original: 'The 4400',
                        name_alternative: ['Четыре тысячи четыреста'],
                        year: '2007',
                        genre: ['фантастические'],
                        country: ['США'],
                        description: 'На протяжении двадцатого века пропало 4 тысячи 400 человек, а теперь неслыханно, но они возвратились такими же, какими и ушли. Власти волнуются, они пытаются осознать, где всё это время были эти люди и отчего их кто-то отпустил. В скором будет всё ясно, что их прибывание может поменять необычайно этот мир...',
                        rating: { imdb: '7.40', kinopoisk: '7.46' } }],
                [{ id: 5,
                        poster: 'http://cdn.seasonvar.ru/oblojka/5.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/5.jpg',
                        season_number: 1,
                        name: 'Герои',
                        name_original: 'Heroes',
                        year: '2006',
                        genre: ['фантастические', 'ужасы', 'драмы'],
                        country: ['США'],
                        description: 'Планета находится во власти ночи. Специалист по генетике, находящийся в Индии и обеспокоенный пропажей папы, создаёт открытие - о сверхлюдях, которые живут вокруг нас. Парень начал убеждать брата, который занимается политикой, в том, что умеет летать. Девушка из старших классов соображает, что обладает вечной жизнью. Девушка, которая прокармливает сына за счёт показа своего красивого тела, узнаёт, что в её отображении есть какая-то тайна. Один нарушитель удачно увиливает от властей, которые уже не один раз хотели его взять. Гениальный, но наркозависимый рисовальщик изображает то, что должно случится. Копу из Лос-Анджелеса, которому хоть и не везёт удаётся поймать несносного маньяка благодаря его способности к чтению мыслей. Сверхлюди либо делают всё куда лучше, либо...',
                        rating: { imdb: '7.60', kinopoisk: '7.82' } },
                    { id: 6,
                        poster: 'http://cdn.seasonvar.ru/oblojka/6.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/6.jpg',
                        season_number: 2,
                        name: 'Герои',
                        name_original: 'Heroes',
                        year: '2007',
                        genre: ['фантастические', 'ужасы', 'драмы'],
                        country: ['США'],
                        description: 'Тьма затмила Землю. Профессор, увлекающийся генетикой, находится в недоумении от того, что его отец куда-то пропастился, но он обнаружил нечто интересное  - на нашей планете существуют люди с уникальными способностями. Мальчик утверждает, что способен летать, о чём и сообщает политически грамотному брату. Выпускница школы узнала, что ей не страшна смерть. Девушка - работница стрипклуба, которая перебивается со своим сыном ото дня день, заметила, что её вид в зеркале несёт в себе тайну. Парень обхитрил правительство, которые уже пару раз стремились остановить его. Наркоман рисует картины, на которых видно будущее время. Парню из полиции, у которого мало, что получается, есть способности к тому, о чём думают люди, поэтому он ловит опасного преступника. В стране восходящего солнца юноша в силах остановить время своим устремлением. Они сильно влияют на мир, но в какую сторону...',
                        rating: { imdb: '7.60', kinopoisk: '7.82' } },
                    { id: 7,
                        poster: 'http://cdn.seasonvar.ru/oblojka/7.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/7.jpg',
                        season_number: 3,
                        name: 'Герои',
                        name_original: 'Heroes',
                        year: '2008',
                        genre: ['фантастические', 'ужасы', 'драмы'],
                        country: ['США'],
                        description: 'Ночь оковала Голубую планету. У индуса генетика странным образом исчезает папа, ошеломлённый этим он всё-таки сделал секретную теорию - рядом имеюются люди, которые способны на многое. Парень, витающий в воздушных замках, говорит своему брату-политику о своём даре к полёту. Девушке со школы никогда не угрожает быть мёртвой. Доступная девушка занимается ремеслом ради сына, она углядела, что её зеркальный образ таит загадку. Преступник умудряется дважды обыграть суд, который никак его не сумеет прихватить. В начертаниях картин художника, который сидит на наркотиках, отображаются ситуации, которые произойдут. Служащий полиции лишь из=за того, что знает мысли окружающих ловит дикого преступника. В Японии имеется личность, которая тормозит временное пространство. Голубая планета в опасности, ей нужна помощь...',
                        rating: { imdb: '7.60', kinopoisk: '7.82' } },
                    { id: 392,
                        poster: 'http://cdn.seasonvar.ru/oblojka/392.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/392.jpg',
                        season_number: 4,
                        name: 'Герои',
                        name_original: 'Heroes',
                        year: '2009',
                        genre: ['фантастические', 'ужасы', 'драмы'],
                        country: ['США'],
                        description: 'Мрак скрыл планету. И тогда учёный-генетик индус, после исчезновения отца смог открыть теорию о людях с феноменальными возможностями... Один говорит брату-политику, что способен летать. Школьнице становится ясно, что ничто не сможет ей причинить увечье. On-line cтриптизерша из Лас-Вегаса старается помочь своему сыну и однажды замечает, что в отражении зеркальном имеется тайна. Преступник уже не единожды сумел уйти от копов. Гениальный художник-наркоман испортил отношения с любимой, но теперь видит будущее с помощью своих картин. Один непутёвый коп с Лос-Анджелеса читает мысли свирепых преступников! Юноша с Японии останавливает время. Эта команда должна спасти мир от катастрофы!',
                        rating: { imdb: '7.60', kinopoisk: '7.82' } }],
                [{ id: 8,
                        poster: 'http://cdn.seasonvar.ru/oblojka/8.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/8.jpg',
                        season_number: 1,
                        name: 'Говорящая с призраками',
                        name_original: 'Ghost Whisperer',
                        year: '2005',
                        genre: ['мистические', 'фэнтези', 'драмы'],
                        country: ['США'],
                        description: 'Привидение идёт по пятам за приятельницей Мелинды Андреа. Оно перемещает вещи, дабы привлечь взгляды на него. Отлично выходит у приведения это нагнать страх на Андреа. Приятельница желает посодействовать в этой ситуации, чтоб уяснить, кто оно, что ему надо. Андреа думает, что это тот, встреча с которым была пару лет назад, ещё в Нью-Йорке...\r\n\r\n',
                        rating: { imdb: '6.40', kinopoisk: '7.32' } },
                    { id: 9,
                        poster: 'http://cdn.seasonvar.ru/oblojka/9.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/9.jpg',
                        season_number: 2,
                        name: 'Говорящая с призраками',
                        name_original: 'Ghost Whisperer',
                        year: '2006',
                        genre: ['мистические', 'фэнтези', 'драмы'],
                        country: ['США'],
                        description: 'Мелинда недавно сыграла свадьбу. Она занимается продажей старинных вещей. Можно подумать, что она похоже на всех девушек. Но она необычайна, она контактирует с призраками погибших. Благодаря такому дару она может помочь живым людям, ведь призраки передают информацию...',
                        rating: { imdb: '6.40', kinopoisk: '7.32' } },
                    { id: 10,
                        poster: 'http://cdn.seasonvar.ru/oblojka/10.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/10.jpg',
                        season_number: 3,
                        name: 'Говорящая с призраками',
                        name_original: 'Ghost Whisperer',
                        year: '2007',
                        genre: ['мистические', 'фэнтези', 'драмы'],
                        country: ['США'],
                        description: 'Мелинда недавно сыграла свадьбу. Она занимается продажей старинных вещей. Можно подумать, что она похоже на всех девушек. Но она необычайна, она контактирует с призраками погибших. Благодаря такому дару она может помочь живым людям, ведь призраки передают информацию…',
                        rating: { imdb: '6.40', kinopoisk: '7.32' } },
                    { id: 11,
                        poster: 'http://cdn.seasonvar.ru/oblojka/11.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/11.jpg',
                        season_number: 4,
                        name: 'Говорящая с призраками',
                        name_original: 'Ghost Whisperer',
                        year: '2008',
                        genre: ['мистические', 'фэнтези', 'драмы'],
                        country: ['США'],
                        description: 'Дар медиума (человека, который способен общаться с умершими) в семье Мелинды Гордон передавался из поколения в поколение. Женщина сочувствует мертвым, которые не могут упокоиться с миром, и без колебаний старается помочь им: передает приветы их близким, советует, каким образом уладить те дела, который не успел закончить умерший. Однако с переездом в новый дом начинают происходить пугающие события – на зеркалах появляются таинственные символы, а по темным коридорам бродят зловещие призраки...',
                        rating: { imdb: '6.40', kinopoisk: '7.32' } },
                    { id: 462,
                        poster: 'http://cdn.seasonvar.ru/oblojka/462.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/462.jpg',
                        season_number: 5,
                        name: 'Говорящая с призраками',
                        name_original: 'Ghost Whisperer',
                        year: '2009',
                        genre: ['мистические', 'фэнтези', 'драмы'],
                        country: ['США'],
                        description: 'Мелинда Гордон недавно справила свадьбу и начала вести свой антикварный магазин. Можно решить, что она такая же как и все девушки, но это не так. Мелинда имеет контакт с душами ушедших в мир иной. Она беседует с душами и получает от них важные сведения, которые помогают людям в её мире...',
                        rating: { imdb: '6.40', kinopoisk: '7.32' } }],
                [{ id: 3790,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3790.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3790.jpg',
                        name: 'Последний враг',
                        name_original: 'The Last Enemy',
                        year: '2008',
                        genre: ['драмы', 'триллеры'],
                        country: ['Великобритания'],
                        description: 'Недалекое будущее. После теракта на одной из станций лондонского метро британские власти устанавливают в стране тоталитарный режим. Население отчаянно боится террористов, поэтому не возражает, когда каждый гражданин получает обязательный электронный жетон, отслеживающий его местонахождение в любой момент дня и ночи. Большой Брат уже проснулся, но никто против этого не возражает, все боятся.',
                        rating: { imdb: '7.10', kinopoisk: '7.22' } }],
                [{ id: 3792,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3792.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3792.jpg',
                        name: 'Закон',
                        year: '2002',
                        genre: ['драмы', 'криминальные', 'отечественные'],
                        country: ['Россия'],
                        description: 'Беззаконие и произвол захлестнули жизнь небольшого провинциального городка. Согласно неофициальным уликам, выясняется, что пособничество делам банды оказывает известный телевизионный ведущий религиозной программы, пользующийся в народе большим уважением. Иван Скляр - тот человек, который встанет у него на пути – бесстрашный и очень опытный судья, свято верящий в неизбежность наказания. \r\n\r\nНо вскоре, за недостатком доказательств, суд присяжных выносит убийце оправдательный приговор. Так, для Ивана Скляра, этот процесс, становится долгом чести: он поклялся найти дополнительные улики против злодея. Личная жизнь судебного исполнителя рушится: жена уходит из дому, а дочь безумно влюблена с предполагаемого преступника…',
                        rating: { imdb: '7.50', kinopoisk: '7.75' } }],
                [{ id: 3793,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3793.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3793.jpg',
                        name: 'Робинзон',
                        year: '2010',
                        genre: ['драмы', 'отечественные'],
                        country: ['Россия'],
                        description: 'Действие фильма берёт своё начало 1985 году. В небольшом городке на севере страны живут трое совсем ещё юных мальчишек - Лёшка Балунов, Вовка Титов и Сашка Робертсон. Все они когда-то мечтали стать офицерами военно-морского флота. Их отцы служат на подводной лодке и часто уходят на секретные задания. \r\n\r\nПо прошествии времени, когда закадычные друзья оканчивали школу, военная служба уже не представлялась настолько престижной, ценности общества менялись, а подлодки только ржавели… \r\n\r\nТак, Вовка отправляется в Москву и начинает заниматься бизнесом. Лёшка пошёл случить в морскую пехоту. И только Сашка всегда был верным юношеской мечте – он начинает карьеру подводника… После событий, прогремевших на всю страну, когда в 1996 году на подлодке произошла авария, Сашка был там, на «краю бездны». Оказавшись заблокированным в отсеке, в кромешной тьме, Робертсон выжил! Невзирая на ультиматум жены – или она или флот, он по-прежнему верен присяге и продолжает нести службу.',
                        rating: { imdb: '8.40', kinopoisk: '6.77' } }],
                [{ id: 3801,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3801.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3801.jpg',
                        name: 'Пение птиц',
                        name_original: 'Birdsong',
                        year: '2012',
                        genre: ['драмы', 'исторические'],
                        country: ['Великобритания'],
                        description: 'В основе этого коротенького сериала лежит сюжет романа «Пение птиц» известного Британского писателя Чарльза Фолкса, который был написан в1993 году. В книге изложена биография Стивена Рейсфорда. Он делится со зрителем своими воспоминаниями, когда во время Первой мировой войны испытывал сильные любовные чувства к одной француженке. Но эта любовь была запретной.',
                        rating: { imdb: '7.40', kinopoisk: '7.45' } }],
                [{ id: 3803,
                        poster: 'http://cdn.seasonvar.ru/oblojka/3803.jpg',
                        poster_small: 'http://cdn.seasonvar.ru/oblojka/small/3803.jpg',
                        season_number: 1,
                        name: 'Это - Англия. Год 1986',
                        name_original: 'This Is England \'86',
                        year: '2010',
                        genre: ['драмы'],
                        country: ['Великобритания'],
                        description: 'Действия фильма разворачиваются в 986 году. Только недавно, всего четыре года назад, прогремела Фолклендская война, а страну уже ждут новые потрясения. В центре этих событий и оказываются герои данной картины.',
                        rating: { imdb: '8.30', kinopoisk: '8.25' } }]
            ]);
        });
    }
    exports.getAllSerials = getAllSerials;
});
define("ListControllerChannels", ["require", "exports", "ListController", "RouteManager", "HTTP"], function (require, exports, ListController_1, RouteManager_1, HTTP_1) {
    "use strict";
    exports.__esModule = true;
    new RouteManager_1["default"]().set;
    var ListControllerChannels = /** @class */ (function (_super) {
        __extends(ListControllerChannels, _super);
        function ListControllerChannels() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerChannels.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openSerial();
        };
        ListControllerChannels.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerChannels.prototype.openVideoList = function () {
            this.model.channelSections.scrolPosition.set(0);
            this.model.channelSections.focusPosition.set(0);
            var videoList = this.model.getInstance("video").getValue("list");
            var model = this.model;
            var nextPageToken = this.model
                .getInstance("video")
                .getValue("nextPageToken");
            var route = this.model.getInstance("App").getValue("route");
            HTTPgetVideo(this.activeItem.id).then(function (data) {
                videoList.set(data.items);
                nextPageToken.set(data.nextPageToken);
                model.video.totalResults.set(data.pageInfo.totalResults);
                new RouteManager_1["default"]().set("/video");
            });
        };
        ListControllerChannels.prototype.openSerial = function () {
            if (this.activeItem.length > 1) {
                this.openSeasonList();
            }
            else {
                this.openSeriesList();
            }
        };
        ListControllerChannels.prototype.openSeriesList = function () {
            new RouteManager_1["default"]().set("/seriesList");
            var list = this.model.getInstance("seriesList").getValue("list");
            this.model.seasonList.scrolPosition.set(0);
            this.model.seasonList.focusPosition.set(0);
            console.log(this.activeItem);
            HTTP_1.getSeason(this.activeItem[0].id).then(function (data) {
                data.playlist.forEach(function (item) {
                    item.poster = data.poster;
                });
                list.set(data.playlist);
            });
        };
        ListControllerChannels.prototype.openSeasonList = function () {
            new RouteManager_1["default"]().set("/seasonList");
            var list = this.model.getInstance("seasonList").getValue("list");
            this.model.seasonList.scrolPosition.set(0);
            this.model.seasonList.focusPosition.set(0);
            list.set(this.activeItem);
        };
        ListControllerChannels.prototype.openChannelSections = function () {
            var list = this.model.getInstance("channelSections").getValue("list");
            new RouteManager_1["default"]().set("/channelSection");
            this.model.channelSections.scrolPosition.set(0);
            this.model.channelSections.focusPosition.set(0);
            var allVideos = {
                id: this.activeItem.id,
                snippet: {
                    title: "Все видео",
                    type: "allVideos"
                },
                firstPlayList: {
                    snippet: {
                        thumbnails: {
                            medium: {
                                url: "./img/allVideos.png"
                            }
                        }
                    }
                }
            };
            getChannelSections(this.activeItem.id).then(function (data) {
                var itemsArr = data.items.filter(function (item) {
                    if (typeof item.contentDetails !== 'undefined') {
                        if (typeof item.contentDetails.playlists !== 'undefined') {
                            if (typeof item.contentDetails.playlists[0] !== 'undefined') {
                                return item.firstPlayList = item.contentDetails.playlists[0];
                            }
                        }
                    }
                });
                var stringPlayListId = itemsArr.map(function (item) {
                    return item.firstPlayList;
                }).join(",");
                getPlaylistsForIdList(stringPlayListId).then(function (data) {
                    var i = 0;
                    itemsArr.forEach(function (item) {
                        item.firstPlayList = data.items[i];
                        i++;
                    });
                    itemsArr.unshift(allVideos);
                    list.set(itemsArr);
                });
            });
        };
        return ListControllerChannels;
    }(ListController_1["default"]));
    exports["default"] = ListControllerChannels;
});
define("interfaceGlobal", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("Play", ["require", "exports", "AppModel"], function (require, exports, AppModel_4) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_4["default"]();
    var Play = model.getInstance("Play");
    var VideoList = model.getInstance("seriesList");
    var App = model.getInstance("App");
    var namespace = {
        model: {
            VideoList: VideoList,
            Play: Play,
            App: App
        }
    };
    var _ = {};
    _.playControlInterfaceInit = function () {
        try {
            var durationSec = stb.GetMediaLenEx() / 1000;
            var progress = namespace.model.Play.progress.get();
            progress.play = 0;
            namespace.model.Play.progress.set(progress);
            var timeBar = namespace.model.Play.timeBar.get();
            timeBar.durationSec = durationSec;
            timeBar.playSec = 0;
            namespace.model.Play.timeBar.set(timeBar);
        }
        catch (e) {
            console.log(e);
        }
        namespace.model.Play.status.set("play");
        var display = namespace.model.VideoList.display.get()();
        var activePosition = namespace.model.VideoList.focusPosition.get();
        var name = display[activePosition].name;
        namespace.model.Play.name.set(name);
        this.showPlayInfo();
        this.progresControllStart();
    };
    _.progresControllStart = function progresControllStart() {
        if (this.progresControllInterval) {
            clearInterval(this.progresControllInterval);
        }
        this.progresControllInterval = setInterval(function () {
            try {
                var playPosition = stb.GetPosTimeEx();
                var duration = stb.GetMediaLenEx();
                var percent = 100 / duration;
                var percentPosition = percent * playPosition;
                var progress = namespace.model.Play.progress.get();
                if (!(percent && percentPosition)) {
                    percentPosition = 0;
                }
                namespace.model.Play.timeBar.get().playSec = playPosition / 1000;
                namespace.model.Play.timeBar.get().durationSec = duration / 1000;
                namespace.model.Play.timeBar.set(namespace.model.Play.timeBar.get());
                if (percentPosition > 99.9) {
                    _.exitPlay();
                }
                progress.play = percentPosition;
                progress.duration = duration;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
        }, 2000);
    };
    _.progresControllInterval = undefined;
    _.pause = function () {
        namespace.model.Play.status.set("pause");
        namespace.model.Play.visibleControlBar.set(true);
        clearTimeout(_.showPlayInfo.timer);
        try {
            stb.Pause();
        }
        catch (e) {
            console.log(e);
        }
    };
    _.continuePlayback = function () {
        try {
            stb.Continue();
            namespace.model.Play.status.set("play");
            this.showPlayInfo();
        }
        catch (e) {
            console.log(e);
        }
    };
    _.switchPlayPause = function () {
        try {
            var status = stb.IsPlaying();
            if (status) {
                this.pause();
            }
            else {
                this.continuePlayback();
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    _.showPlayInfo = function showPlayInfo() {
        namespace.model.Play.visibleControlBar.set(true);
        var selfFunction = showPlayInfo;
        try {
            if (selfFunction.timer) {
                clearInterval(selfFunction.timer);
            }
        }
        catch (e) {
            console.log(e);
        }
        selfFunction.timer = setTimeout(function () {
            namespace.model.Play.visibleControlBar.set(false);
        }, 5000);
    };
    _.exitPlay = function () {
        try {
            clearInterval(this.progresControllInterval);
        }
        catch (e) {
            console.log(e);
        }
        namespace.model.App.route.set("/video");
        try {
            stb.SetVideoState(0);
            stb.Stop();
        }
        catch (e) {
            console.log(e);
        }
    };
    _.volumePlus = function () {
        this.showPlayInfo();
        try {
            var vol = stb.GetVolume();
            vol = vol + 10;
            if (vol > 100) {
                vol = 100;
            }
            stb.SetVolume(vol);
            namespace.model.Play.volume.set(stb.GetVolume());
        }
        catch (e) {
            console.log(e);
        }
    };
    _.volumeMinus = function () {
        this.showPlayInfo();
        try {
            var vol = stb.GetVolume();
            if (vol <= 10) {
                vol = 0;
            }
            else {
                vol = vol - 10;
            }
            stb.SetVolume(vol);
            namespace.model.Play.volume.set(stb.GetVolume());
        }
        catch (e) {
            console.log(e);
        }
    };
    _.timeShiftControlTimer = false;
    _.timeShiftControlActive = false;
    _.timeShiftCurrentTime = false;
    _.timeShiftBlock = false;
    _.timeShiftRight = function () {
        if (this.timeShiftBlock) {
            return;
        }
        clearInterval(this.progresControllInterval);
        var self = this;
        this.showPlayInfo();
        var time;
        if (this.timeShiftControlActive) {
            time = this.timeShiftCurrentTime;
        }
        else {
            try {
                time = stb.GetPosTimeEx();
            }
            catch (e) {
                time = 5;
            }
        }
        this.timeShiftControlActive = true;
        this.timeShiftCurrentTime =
            time + namespace.model.Play.timeShiftSize.get().value * 1000;
        var duration = stb.GetMediaLenEx();
        var percent = 100 / duration;
        var percentPosition = percent * this.timeShiftCurrentTime;
        var progress = namespace.model.Play.progress.get();
        var timeBar = namespace.model.Play.timeBar.get();
        timeBar.durationSec = duration / 1000;
        timeBar.playSec = this.timeShiftCurrentTime / 1000;
        if (timeBar.playSec >= timeBar.durationSec) {
            timeBar.playSec = timeBar.durationSec;
        }
        if (timeBar.playSec <= 0) {
            timeBar.playSec = 0;
        }
        if (percentPosition > 100) {
            percentPosition = 100;
        }
        if (percentPosition <= 0) {
            percentPosition = 0;
        }
        namespace.model.Play.timeBar.set(timeBar);
        progress.play = percentPosition;
        namespace.model.Play.progress.set(progress);
        if (this.timeShiftControlTimer) {
            clearTimeout(this.timeShiftControlTimer);
        }
        this.timeShiftControlTimer = setTimeout(function () {
            try {
                var duration = stb.GetMediaLenEx();
                if (self.timeShiftCurrentTime >= duration ||
                    self.timeShiftCurrentTime <= 0) {
                    self.timeShiftCurrentTime = 0;
                }
                stb.SetPosTimeEx(self.timeShiftCurrentTime);
                var percent = 100 / duration;
                var percentPosition = percent * self.timeShiftCurrentTime;
                var progress = namespace.model.Play.progress.get();
                progress.play = percentPosition;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
            self.timeShiftBlock = true;
            setTimeout(function () {
                self.timeShiftBlock = false;
                self.progresControllStart();
                self.timeShiftControlActive = false;
            }, 1000);
        }, 1500);
    };
    _.timeShiftLeft = function () {
        if (this.timeShiftBlock) {
            return;
        }
        clearInterval(this.progresControllInterval);
        var self = this;
        this.showPlayInfo();
        var time;
        if (this.timeShiftControlActive) {
            time = this.timeShiftCurrentTime;
        }
        else {
            try {
                time = stb.GetPosTimeEx();
            }
            catch (e) {
                time = 5;
            }
        }
        this.timeShiftControlActive = true;
        this.timeShiftCurrentTime =
            time - namespace.model.Play.timeShiftSize.get().value * 1000;
        var duration = stb.GetMediaLenEx();
        var percent = 100 / duration;
        var percentPosition = percent * this.timeShiftCurrentTime;
        var progress = namespace.model.Play.progress.get();
        var timeBar = namespace.model.Play.timeBar.get();
        timeBar.durationSec = duration / 1000;
        timeBar.playSec = this.timeShiftCurrentTime / 1000;
        if (timeBar.playSec >= timeBar.durationSec) {
            timeBar.playSec = timeBar.durationSec;
        }
        if (timeBar.playSec <= 0) {
            timeBar.playSec = 0;
        }
        if (percentPosition > 100) {
            percentPosition = 100;
        }
        if (percentPosition <= 0) {
            percentPosition = 0;
        }
        namespace.model.Play.timeBar.set(timeBar);
        progress.play = percentPosition;
        namespace.model.Play.progress.set(progress);
        if (this.timeShiftControlTimer) {
            clearTimeout(this.timeShiftControlTimer);
        }
        this.timeShiftControlTimer = setTimeout(function () {
            try {
                var duration = stb.GetMediaLenEx();
                if (self.timeShiftCurrentTime >= duration ||
                    self.timeShiftCurrentTime <= 0) {
                    self.timeShiftCurrentTime = 0;
                }
                stb.SetPosTimeEx(self.timeShiftCurrentTime);
                var percent = 100 / duration;
                var percentPosition = percent * self.timeShiftCurrentTime;
                var progress = namespace.model.Play.progress.get();
                progress.play = percentPosition;
                namespace.model.Play.progress.set(progress);
            }
            catch (e) {
                console.log(e);
            }
            self.timeShiftBlock = true;
            setTimeout(function () {
                self.timeShiftBlock = false;
                self.progresControllStart();
                self.timeShiftControlActive = false;
            }, 1000);
        }, 1500);
    };
    (function () {
        _.nextTimeShiftSize = function () {
            changeTimeShiftSize(1);
            _.showPlayInfo();
        };
        _.prevTimeShiftSize = function () {
            changeTimeShiftSize(-1);
            _.showPlayInfo();
        };
        function changeTimeShiftSize(changeValue) {
            var size = namespace.model.Play.timeShiftSize.get();
            var i = 0;
            var index = 0;
            timeShiftSizeList.forEach(function (item) {
                if (item.value === size.value) {
                    index = i;
                }
                i++;
            });
            if (typeof timeShiftSizeList[index + changeValue] !== 'undefined') {
                namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index + changeValue]);
            }
            else {
                namespace.model.Play.timeShiftSize.set(timeShiftSizeList[index]);
            }
        }
        var timeShiftSizeList = [
            {
                name: "10 мин",
                value: 600,
                command: "changetimeShiftSize"
            },
            {
                name: "05 мин",
                value: 300,
                command: "changetimeShiftSize"
            },
            {
                name: "01 мин",
                value: 60,
                command: "changetimeShiftSize"
            },
            {
                name: "30 сек",
                value: 30,
                command: "changetimeShiftSize"
            },
            {
                name: "20 сек",
                value: 20,
                command: "changetimeShiftSize"
            },
            {
                name: "10 сек",
                value: 10,
                command: "changetimeShiftSize"
            }
        ];
    })();
    _.OpenSettingMenu = function () {
        namespace.model.App.route.set("/play/settingMenu");
        namespace.model.Play.settingMenu.visible.set(true);
        namespace.model.Play.visibleControlBar.set(true);
        if (typeof _.showPlayInfo.timer !== "undefined") {
            clearTimeout(_.showPlayInfo.timer);
        }
        ///
        this.SettingMenuCommands.openQualityList(); /// <--- 
        /// временно вместо SettingMenu сразу открывается QualityList (на текущий момент кроме QualityList ет настроек)
        /// var menuList = namespace.model.Play.settingMenu.mainList.get();
        /// menuList = JSON.parse(JSON.stringify(menuList));
        /// namespace.model.Play.settingMenu.list.set(menuList);
        //var menuList = namespace.model.Play.settingMenu.mainList.get();
        //menuList = JSON.parse(JSON.stringify(menuList));
        //namespace.model.Play.settingMenu.list.set(menuList);
    };
    _.playSettingMenuNextElem = function () {
        changePlaySettingMenuElemPosition("+");
    };
    _.playSettingMenuPrevElem = function () {
        changePlaySettingMenuElemPosition("-");
    };
    function changePlaySettingMenuElemPosition(string) {
        var list = namespace.model.Play.settingMenu.list.get();
        var activeIndex;
        var i = 0;
        list.forEach(function (item) {
            if (item.active) {
                item.active = false;
                activeIndex = i;
            }
            i++;
        });
        var newIndex;
        if (string === "-") {
            newIndex = activeIndex - 1;
        }
        else {
            newIndex = activeIndex + 1;
        }
        if (typeof list[newIndex] === "undefined") {
            newIndex = activeIndex;
        }
        list[newIndex].active = true;
        namespace.model.Play.settingMenu.list.set(list);
    }
    _.playSettingMenuSubmit = function () {
        var list = namespace.model.Play.settingMenu.list.get();
        var activeItem;
        list.forEach(function (item) {
            if (item.active) {
                activeItem = item;
            }
        });
        var key = activeItem.command;
        if (typeof this.SettingMenuCommands[key] === "undefined") {
            return;
        }
        this.SettingMenuCommands[key](activeItem);
    };
    _.closeSettingMenu = function () {
        namespace.model.App.route.set("/play");
        var qualityList = namespace.model.Play.settingMenu.qualityList.get();
        qualityList.forEach(function (item) {
            item.active = false;
        });
        namespace.model.Play.settingMenu.visible.set(false);
        _.showPlayInfo();
        var menuList = namespace.model.Play.settingMenu.mainList.get();
        menuList = JSON.parse(JSON.stringify(menuList));
        namespace.model.Play.settingMenu.list.set(menuList);
    };
    _.SettingMenuCommands = {
        changetimeShiftSize: function (item) {
            var newItemActivated = item;
            _.showPlayInfo();
            namespace.model.Play.settingMenu.visible.set(false);
            var speedList = namespace.model.Play.settingMenu.timeShiftSizeList.get();
            speedList.forEach(function (item) {
                item.active = false;
                item.activated = false;
                if (item.name === newItemActivated.name) {
                    item.activated = true;
                }
            });
            namespace.model.Play.timeShiftSize.set(item);
            _.closeSettingMenu();
        },
        openQualityList: function () {
            var qualityList = namespace.model.Play.settingMenu.qualityList.get();
            qualityList = JSON.parse(JSON.stringify(qualityList));
            qualityList.forEach(function (item) {
                if (item.format_id === "22") {
                    item.name = "720p";
                }
                else if (item.format_id === "43") {
                    item.name = "480p";
                }
                else if (item.format_id === "18") {
                    item.name = "360p";
                }
                else if (item.format_id === "36") {
                    item.name = "240p";
                }
                else if (item.format_id === "17") {
                    item.name = "144p";
                }
                else {
                    item.name = "Качество не определено";
                }
            });
            qualityList.forEach(function (item) {
                item.command = "changeQuality";
            });
            qualityList.forEach(function (item) {
                if (item.activated) {
                    item.active = true;
                }
            });
            namespace.model.Play.settingMenu.list.set(qualityList);
            namespace.model.Play.settingMenu.qualityList.set(qualityList);
        },
        changeQuality: function (item) {
            try {
                var position = stb.GetPosTimeEx();
                stb.Play(item.url);
                stb.SetPosTimeEx(position);
            }
            catch (e) {
                console.log(e);
            }
            _.showPlayInfo();
            namespace.model.Play.settingMenu.visible.set(false);
            var qualityList = namespace.model.Play.settingMenu.qualityList.get();
            qualityList.forEach(function (item) {
                item.active = false;
                item.activated = false;
            });
            item.activated = true;
            _.closeSettingMenu();
        }
    };
    exports["default"] = _;
});
define("ListControllerVideo", ["require", "exports", "ListController", "Play", "RouteManager"], function (require, exports, ListController_2, Play_1, RouteManager_2) {
    "use strict";
    exports.__esModule = true;
    var ListControllerVideo = /** @class */ (function (_super) {
        __extends(ListControllerVideo, _super);
        function ListControllerVideo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerVideo.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openVideo();
        };
        ListControllerVideo.prototype.goHome = function () {
            new RouteManager_2["default"]().set("/home");
        };
        ListControllerVideo.prototype.infiniteScroll = function () {
            return false;
        };
        ListControllerVideo.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerVideo.prototype.openVideo = function () {
            var _this = this;
            this.model.App.route.set("/play");
            this.model.Play.timeBar.set({ playSec: 0, durationSec: 0 });
            this.model.Play.loadingWheel.set(true);
            var url;
            var display = this.model.seriesList.display.get()();
            var activePosition = this.model.video.focusPosition.get();
            var qualityArr = [{ url: display[activePosition].link }];
            if (typeof qualityArr[0].url === "undefined") {
                throw new Error("qualityArr undefined");
            }
            Play_1["default"].playControlInterfaceInit();
            var newQualityArr = [];
            qualityArr.forEach(function (item) {
                newQualityArr.unshift(item);
            });
            var url = newQualityArr[0].url;
            newQualityArr[0].activated = true;
            this.model.Play.settingMenu.qualityList.set(newQualityArr);
            setTimeout(function () {
                _this.model.Play.loadingWheel.set(false);
            }, 500);
            try {
                if (!url) {
                    throw new Error("url not found");
                }
                else {
                    stb.SetVideoState(1);
                    stb.Play(url);
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        return ListControllerVideo;
    }(ListController_2["default"]));
    exports["default"] = ListControllerVideo;
});
define("ListControllerPlayLists", ["require", "exports", "ListController", "HTTP", "RouteManager"], function (require, exports, ListController_3, HTTP_2, RouteManager_3) {
    "use strict";
    exports.__esModule = true;
    var ListControllerChannelSections = /** @class */ (function (_super) {
        __extends(ListControllerChannelSections, _super);
        function ListControllerChannelSections() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListControllerChannelSections.prototype.goHome = function () {
            new RouteManager_3["default"]().set("/home");
        };
        ListControllerChannelSections.prototype.onEnter = function () {
            this.defineActiveItem();
            this.openItem();
        };
        ListControllerChannelSections.prototype.defineActiveItem = function () {
            var focusPosition = this.focusPosition.get();
            var display = this.display.get()();
            this.activeItem = display[focusPosition];
        };
        ListControllerChannelSections.prototype.openItem = function () {
            this.openSinglePlaylist();
        };
        ListControllerChannelSections.prototype.openSinglePlaylist = function () {
            this.model.video.focusPosition.set(0);
            this.model.video.scrolPosition.set(0);
            var videoList = this.model.getInstance("video").getValue("list");
            var model = this.model;
            var nextPageToken = this.model
                .getInstance("video")
                .getValue("nextPageToken");
            var route = this.model.getInstance("App").getValue("route");
            HTTP_2.getPlaylistItems(this.activeItem.id).then(function (data) {
                nextPageToken.set(data.nextPageToken);
                videoList.set(data.items);
                model.video.totalResults.set(data.pageInfo.totalResults);
                var idString = data.items.map(function (item) {
                    return item.contentDetails.videoId;
                }).join(",");
                HTTP_2.HTTPgetVideoDetails(idString).then(function (data) {
                    videoList.set(data.items);
                });
                new RouteManager_3["default"]().set("/video");
            });
        };
        return ListControllerChannelSections;
    }(ListController_3["default"]));
    exports["default"] = ListControllerChannelSections;
});
define("ExitManager", ["require", "exports", "AppModel", "RouteManager"], function (require, exports, AppModel_5, RouteManager_4) {
    "use strict";
    exports.__esModule = true;
    var routeManager = new RouteManager_4["default"]();
    var ExitManager = /** @class */ (function () {
        function ExitManager() {
            if (typeof ExitManager.cache !== 'undefined') {
                return ExitManager.cache;
            }
            this.model = new AppModel_5["default"]();
            this.App = this.model.getInstance("App");
            this.route = this.App.getValue("route");
            this.ExitMenuInstance = this.model.getInstance("ExitMenuInstance");
            this.exitReqConfig = this.ExitMenuInstance.getValue("config");
            ExitManager.cache = this;
        }
        ExitManager.prototype.exitReq = function () {
            this.oldRoute = this.route.get();
            this.exitReqConfig.set({
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
            });
            routeManager.set("/exitReq");
        };
        ExitManager.prototype.exit = function () {
            stb.SetVideoState(1);
            var back_location = decodeURIComponent(window.location.search.match(/\?referrer\=.*/));
            back_location = back_location.replace(/\?referrer\=/, '');
            window.location = back_location;
        };
        ExitManager.prototype.cancel = function () {
            routeManager.back();
        };
        ExitManager.prototype.downFocusPosition = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            list[0].active = false;
            list[1].active = true;
            this.exitReqConfig.set(config);
        };
        ExitManager.prototype.upFocusPosition = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            list[0].active = true;
            list[1].active = false;
            this.exitReqConfig.set(config);
        };
        ExitManager.prototype.submit = function () {
            var config = this.exitReqConfig.get();
            var list = config.list;
            var command;
            list.forEach(function (item) {
                if (item.active) {
                    command = item.command;
                }
            });
            if (command === 'exit') {
                this.exit();
            }
            else if (command === 'cancel') {
                this.cancel();
            }
        };
        return ExitManager;
    }());
    exports["default"] = ExitManager;
});
define("aspectRatioManager", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var _ = {};
    _.elem = undefined;
    _.aspect_array = [
        { text: "ВМЕСТИТЬ", mode: 0x10 },
        { text: "УВЕЛИЧЕННЫЙ", mode: 0x40 },
        { text: "ОПТИМАЛЬНЫЙ", mode: 0x50 },
        { text: "РАСТЯНУТЬ", mode: 0x00 },
        { text: "КОМБИНИРОВАННЫЙ", mode: 0x30 }
    ];
    _.mode = undefined;
    _.init = function () {
        this.mode = this.getAspect();
        var index = this.mode;
        var item = this.aspect_array[index];
        var value = item.mode;
        this.setAspect(value);
        this.setText(item.text);
    };
    _.handler = function () {
        var status = this.statusActive();
        if (status) {
            this.nextAspect();
        }
        this.activate();
    };
    _.next_ = function () {
        this.mode = this.mode + 1;
        if (this.mode > 4) {
            this.mode = 0;
        }
        return this.mode;
    };
    _.nextAspect = function () {
        var index = this.next_();
        var item = this.aspect_array[index];
        var value = item.mode;
        this.setAspect(value);
        this.setText(item.text);
        this.activate();
    };
    _.mount = function (id) {
        this.elem = document.getElementById(id);
    };
    _.setText = function (text) {
        if (!this.elem) {
            return false;
        }
        this.elem.innerHTML = text;
    };
    _.visible = function (mode) {
        if (mode) {
            this.elem.style.display = "block";
        }
        else {
            this.elem.style.display = "none";
        }
    };
    _.statusActive = function statusActive(value) {
        var selfFunc = statusActive;
        if (typeof value === "undefined") {
            if (selfFunc.statusActive) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (value === true) {
            selfFunc.statusActive = true;
        }
        else {
            selfFunc.statusActive = false;
        }
    };
    _.activate = function activate() {
        var selfFunc = activate;
        var self = this;
        this.statusActive(true);
        this.visible(true);
        if (selfFunc.timeout) {
            try {
                clearTimeout(selfFunc.timeout);
            }
            catch (e) {
                console.log(e);
            }
        }
        selfFunc.timeout = setTimeout(function () {
            self.statusActive(false);
            self.visible(false);
            self.saveAspect(self.mode);
        }, 3000);
    };
    _.getAspect = function () {
        var value;
        try {
            value = stb.RDir("getenv aspect", value);
        }
        catch (e) {
            console.log(e);
        }
        if (value) {
            value = +value;
            return value;
        }
        else {
            return 3;
        }
    };
    _.setAspect = function (value) {
        setTimeout(function () {
            try {
                stb.SetAspect(value);
            }
            catch (e) {
                console.log(e);
            }
        }, 0);
    };
    _.saveAspect = function (index) {
        setTimeout(function () {
            try {
                stb.RDir("setenv aspect " + index);
            }
            catch (e) {
                console.log(e);
            }
        }, 1000);
    };
    exports["default"] = _;
});
define("inputLayer", ["require", "exports", "AppModel", "ListControllerChannels", "ListControllerVideo", "ListControllerPlayLists", "Play", "ExitManager", "RouteManager", "aspectRatioManager"], function (require, exports, AppModel_6, ListControllerChannels_1, ListControllerVideo_1, ListControllerPlayLists_1, Play_2, ExitManager_1, RouteManager_5, aspectRatioManager_1) {
    "use strict";
    exports.__esModule = true;
    var model = new AppModel_6["default"]();
    var instanceModel = model.getInstance("serialList");
    var listControllerChannels = new ListControllerChannels_1["default"](instanceModel);
    var instanceModelVideo = model.getInstance("seriesList");
    var listControllerVideo = new ListControllerVideo_1["default"](instanceModelVideo);
    var instanceModelPlayListsList = model.getInstance("playListsList");
    var listControllerPlayListsList = new ListControllerPlayLists_1["default"](instanceModelPlayListsList);
    var exitManager = new ExitManager_1["default"]();
    var routeManager = new RouteManager_5["default"]();
    var _ = {
        init: function init() {
            document.onkeydown = function (event) {
                this.inputHandler(event.keyCode);
            }.bind(this);
        },
        inputHandler: function (code) {
            var route = model.getInstance("App").getValue("route");
            var inputType = route.get();
            if (this.handlers.hasOwnProperty(inputType)) {
                this.handlers[inputType](code);
            }
        },
        handlers: {
            "/home": function (code) {
                switch (code) {
                    case 27:
                        exitManager.exitReq();
                        break;
                    case 40:
                        listControllerChannels.downFocusPosition();
                        break;
                    case 38:
                        listControllerChannels.upFocusPosition();
                        break;
                    case 39:
                        listControllerChannels.rigthFocusPosition();
                        break;
                    case 37:
                        listControllerChannels.leftFocusPosition();
                        break;
                    case 13:
                        listControllerChannels.onEnter();
                        break;
                    case 113:
                        listControllerChannels.onEnter();
                        break;
                    case 112:
                        exitManager.exitReq();
                        break;
                }
            },
            "/channelSection": function (code) {
                switch (code) {
                    case 8:
                        routeManager.back();
                        break;
                    case 27:
                        routeManager.back();
                        break;
                    case 40:
                        listControllerCS.downFocusPosition();
                        break;
                    case 38:
                        listControllerCS.upFocusPosition();
                        break;
                    case 39:
                        listControllerCS.rigthFocusPosition();
                        break;
                    case 37:
                        listControllerCS.leftFocusPosition();
                        break;
                    case 13:
                        listControllerCS.onEnter();
                        break;
                    case 113:
                        listControllerCS.onEnter();
                        break;
                    case 112:
                        exitManager.exitReq();
                        break;
                    case 114:
                        routeManager.back();
                        break;
                }
            },
            "/playListsList": function (code) {
                switch (code) {
                    case 27:
                        routeManager.home();
                        break;
                    case 40:
                        listControllerPlayListsList.downFocusPosition();
                        break;
                    case 38:
                        listControllerPlayListsList.upFocusPosition();
                        break;
                    case 39:
                        listControllerPlayListsList.rigthFocusPosition();
                        break;
                    case 37:
                        listControllerPlayListsList.leftFocusPosition();
                        break;
                    case 13:
                        listControllerPlayListsList.onEnter();
                        break;
                    case 113:
                        listControllerPlayListsList.onEnter();
                        break;
                    case 112:
                        exitManager.exitReq();
                        break;
                    case 115:
                        routeManager.home();
                        break;
                    case 114:
                        routeManager.back();
                        break;
                    case 8:
                        routeManager.back();
                        break;
                }
            },
            "/seriesList": function (code) {
                console.log(code);
                switch (code) {
                    case 8:
                        routeManager.back();
                        break;
                    case 27:
                        routeManager.home();
                        break;
                    case 40:
                        listControllerVideo.downFocusPosition();
                        break;
                    case 38:
                        listControllerVideo.upFocusPosition();
                        break;
                    case 39:
                        listControllerVideo.rigthFocusPosition();
                        break;
                    case 37:
                        listControllerVideo.leftFocusPosition();
                        break;
                    case 13:
                        listControllerVideo.onEnter();
                        break;
                    case 113:
                        listControllerVideo.onEnter();
                        break;
                    case 114:
                        routeManager.back();
                        break;
                    case 115:
                        routeManager.home();
                        break;
                    case 112:
                        exitManager.exitReq();
                        break;
                }
            },
            "/play": function (code) {
                switch (code) {
                    case 27:
                        Play_2["default"].exitPlay();
                        break;
                    case 8:
                        Play_2["default"].exitPlay();
                        break;
                    case 122:
                        Play_2["default"].exitPlay();
                        break;
                    case 82:
                        Play_2["default"].switchPlayPause();
                        break;
                    case 89:
                        Play_2["default"].showPlayInfo();
                        break;
                    case 13:
                        Play_2["default"].showPlayInfo();
                        break;
                    case 38:
                        Play_2["default"].prevTimeShiftSize();
                        break;
                    case 40:
                        Play_2["default"].nextTimeShiftSize();
                        break;
                    case 107:
                        Play_2["default"].volumePlus();
                        break;
                    case 109:
                        Play_2["default"].volumeMinus();
                        break;
                    case 37:
                        Play_2["default"].timeShiftLeft();
                        break;
                    case 39:
                        Play_2["default"].timeShiftRight();
                        break;
                    case 66:
                        Play_2["default"].timeShiftLeft();
                        break;
                    case 70:
                        Play_2["default"].timeShiftRight();
                        break;
                    case 120:
                        Play_2["default"].OpenSettingMenu();
                        break;
                    case 123:
                        Play_2["default"].OpenSettingMenu();
                        break;
                    case 117:
                        aspectRatioManager_1["default"].handler();
                        break;
                }
            },
            "/play/settingMenu": function (code) {
                switch (code) {
                    case 13:
                        Play_2["default"].playSettingMenuSubmit();
                        break;
                    case 38:
                        Play_2["default"].playSettingMenuPrevElem();
                        break;
                    case 40:
                        Play_2["default"].playSettingMenuNextElem();
                        break;
                    case 120:
                        Play_2["default"].closeSettingMenu();
                        break;
                    case 27:
                        Play_2["default"].closeSettingMenu();
                        break;
                    case 8:
                        Play_2["default"].closeSettingMenu();
                        break;
                    case 122:
                        Play_2["default"].closeSettingMenu();
                        break;
                    case 123:
                        Play_2["default"].closeSettingMenu();
                        break;
                }
            },
            "/exitReq": function (code) {
                switch (code) {
                    case 112:
                        exitManager.cancel();
                        break;
                    case 40:
                        exitManager.downFocusPosition();
                        break;
                    case 38:
                        exitManager.upFocusPosition();
                        break;
                    case 13:
                        exitManager.submit();
                        break;
                }
            }
        }
    };
    exports["default"] = _;
});
define("adaptation", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function default_2() {
        if (screen.width > 1200) {
            var rules = [
                ".app_ChannelListComponent_wrap_elem { height: 38%; }",
                ".app_ChannelListComponent_card_img  {  height: 77%; }",
                ".app_ChannelListComponent_card_h1   { font-size: 23px; }",
                ".app_Play_ControlBar_timeShiftSizeBar { right: 230px; }"
            ];
            var cssAll = rules.join("\n");
            var head = document.getElementsByTagName("head");
            head = head[0];
            var style = document.createElement("style");
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = cssAll;
            }
            else {
                style.appendChild(document.createTextNode(cssAll));
            }
            head.appendChild(style);
        }
    }
    exports["default"] = default_2;
});
define("app", ["require", "exports", "Polyfill/bindSimplePolyfill", "AppModel", "Components/PageRouter", "inputLayer", "adaptation", "HTTP", "aspectRatioManager"], function (require, exports, bindSimplePolyfill_1, AppModel_7, PageRouter_1, inputLayer_1, adaptation_1, HTTP_3, aspectRatioManager_2) {
    "use strict";
    exports.__esModule = true;
    var prodaction = true;
    var App = /** @class */ (function () {
        function App() {
        }
        App.main = function (appContainerSelector) {
            bindSimplePolyfill_1["default"]();
            adaptation_1["default"]();
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                stb = gSTB;
                stb.InitPlayer();
                stb.SetVideoControl(1);
                stb.SetVideoState(1);
                stb.SetTopWin(0);
                stb.SetVolume(50);
                var stbEvent = {
                    onEvent: function (data) { },
                    event: 0
                };
            }
            catch (e) {
                console.log(e);
            }
            aspectRatioManager_2["default"].mount("aspect");
            aspectRatioManager_2["default"].init();
            var appContainer = document.getElementById(appContainerSelector);
            var pageRouterWrap = document.createElement("div");
            appContainer.appendChild(pageRouterWrap);
            var model = new AppModel_7["default"]();
            window.model = model;
            HTTP_3.getAllSerials().then(function (data) {
                model.serialList.list.set(data);
            });
            inputLayer_1["default"].init();
            var pageRouter = new PageRouter_1["default"]();
            pageRouter.render(appContainer);
        };
        return App;
    }());
    App.main("app");
});
