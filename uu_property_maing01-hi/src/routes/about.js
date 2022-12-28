//@@viewOn:imports
import { createVisualComponent, Lsi, DynamicLibraryComponent } from "uu5g05";
import { RouteBar } from "../core/route-bar.js";

import Config from "./config/config.js";
import LsiData from "../config/lsi.js";
import AboutCfg from "../config/about.js";
//@@viewOff:imports

export const About = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "About",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function getAuthors(authors) {
      return authors?.map((author) => {
        author = { ...author };
        author.role = author.role && typeof author.role === "object" ? <Lsi lsi={author.role} /> : author.role;
        return author;
      });
    }

    const leadingAuthors = getAuthors(AboutCfg.leadingAuthors);
    return (
      <div>
        <RouteBar />
        <DynamicLibraryComponent
          uu5Tag="Plus4U5.App.About"
          header={<Lsi lsi={LsiData.about.header} />}
          content={<Lsi lsi={AboutCfg.about} />}
        />
        <DynamicLibraryComponent
          uu5Tag="Plus4U5.App.Authors"
          header={<Lsi lsi={LsiData.about.creatorsHeader} />}
          leadingAuthors={leadingAuthors}
        />
      </div>
    );
  },
  //@@viewOff:render
});

export default About;
