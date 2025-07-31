import Encrypter from "../../encrypter/Encrypter";
import Home from "../../home/Home";
import Pgenerator from "../../pgenerator/Pgenerator";
import Pvalidator from "../../pvalidator/Pvalidator";

import RouterTemplate from "./RouterTemplate";

const BaseRouter = () => (
	<RouterTemplate
		routes={[
			{
				path: "/*",
				component: Home,
			},
			{
				path: "/pvalidator",
				component: Pvalidator,
			},
			{
				path: "/pgenerator",
				component: Pgenerator,
			},
			{
				path: "/encrypter",
				component: Encrypter,
			},
		]}
	/>
);

export default BaseRouter;
