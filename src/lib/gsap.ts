import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";

// Register useGSAP, ScrollTrigger, ScrollToPlugin, and Observer plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Observer);

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, Observer };
