import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useNavigate, useParams, UNSAFE_withComponentProps, useLocation, Meta, Links, Outlet, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useEffect, createContext, useState, useContext, useRef } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import { useScroll, useTransform, motion, useMotionValue, animate } from "motion/react";
import clsx from "clsx";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const firstName$2 = "Etienne";
const lastName$2 = "Chesnay";
const jobTitle$2 = "Senior Front-End Engineer";
const about$2 = { "title": "About Me", "description": "Your about content will go here. Describe your experience, skills, and what makes you unique as a senior front-end engineer." };
const skills$1 = { "title": "Skills" };
const portfolio$1 = { "title": "Portfolio", "canalplus": { "title": "CanalPlus", "description": "Within the Interfaces and Experiences Department of Canal+, I work on the front-end development of OTT products." }, "canalplusTv": { "title": "CanalPlus on TV", "description": "Adaptation and deployment of myCanal's Reactjs webapp on new devices : Playstation5, Samsung TV, LG TV and Hisense TV using the proprietary frameworks and SDKs." }, "shadow": { "title": "Shadow", "description": "Within the Core Business Plateform, I worked on the front-end development of Shadow products." }, "stonal": { "title": "Stonal", "description": "Across the front-end teams, I worked on the front-end development of Stonal products. I analyzed, designed, and developed innovative features." } };
const projects$2 = { "title": "Projects", "project1": { "title": "Project 1", "description": "Project description" } };
const contact$2 = { "title": "Contact", "description": { "get_in_touch": "Let's get in touch!", "connect": "Interested in working together? Let's connect!" }, "email": "Email me", "linkedin": "LinkedIn" };
const languageSwitcher$1 = { "changeLanguage": "Change language", "switchTo": "Switch to {{locale}}" };
const en = {
  firstName: firstName$2,
  lastName: lastName$2,
  jobTitle: jobTitle$2,
  about: about$2,
  skills: skills$1,
  portfolio: portfolio$1,
  projects: projects$2,
  contact: contact$2,
  languageSwitcher: languageSwitcher$1
};
const firstName$1 = "Etienne";
const lastName$1 = "Chesnay";
const jobTitle$1 = "Ingénieur Front-End Senior";
const about$1 = { "title": "À Propos", "description": "Votre contenu à propos ira ici. Décrivez votre expérience, vos compétences et ce qui vous rend unique en tant qu'ingénieur front-end senior." };
const skills = { "title": "Compétences" };
const portfolio = { "title": "Portfolio", "canalplus": { "title": "CanalPlus", "description": "Au sein du département Interfaces et Expériences de Canal+, je travaille sur le développement front-end des produits OTT." }, "canalplusTv": { "title": "CanalPlus sur TV", "description": "Adaptation et déploiement de l'application web Reactjs de myCanal sur de nouveaux appareils : Playstation5, Samsung TV, LG TV et Hisense TV en utilisant les frameworks et SDK propriétaires." }, "shadow": { "title": "Shadow", "description": "Au sein de la plateforme Core Business, j'ai travaillé sur le développement front-end des produits Shadow." }, "stonal": { "title": "Stonal", "description": "Au sein des équipes front-end, j'ai travaillé sur le développement front-end des produits Stonal. J'ai analysé, conçu et développé des fonctionnalités innovantes." } };
const projects$1 = { "title": "Projets", "project1": { "title": "Projet 1", "description": "Description du projet" } };
const contact$1 = { "title": "Contact", "description": { "get_in_touch": "Restons en contact !", "connect": "Intéressé par une collaboration ? Connectons-nous !" }, "email": "M'envoyer un email", "linkedin": "LinkedIn" };
const languageSwitcher = { "changeLanguage": "Changer de langue", "switchTo": "Passer en {{locale}}" };
const fr = {
  firstName: firstName$1,
  lastName: lastName$1,
  jobTitle: jobTitle$1,
  about: about$1,
  skills,
  portfolio,
  projects: projects$1,
  contact: contact$1,
  languageSwitcher
};
const firstName = "Etienne";
const lastName = "Chesnay";
const jobTitle = "Ingeniero Front-End Senior";
const about = { "title": "Sobre Mí", "description": "Tu contenido sobre ti irá aquí. Describe tu experiencia, habilidades y lo que te hace único como ingeniero front-end senior." };
const projects = { "title": "Proyectos", "project1": { "title": "Proyecto 1", "description": "Descripción del proyecto" } };
const contact = { "title": "Ponte en Contacto", "description": "¿Interesado en trabajar juntos? ¡Conectemos!" };
const es = {
  firstName,
  lastName,
  jobTitle,
  about,
  projects,
  contact
};
const defaultLocale = "en";
const supportedLocales = ["en", "fr", "es"];
function isValidLocale(locale) {
  return supportedLocales.includes(locale);
}
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es }
  },
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false
  }
});
function getLocaleFromPathname(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const potentialLocale = segments[0];
  if (isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  return defaultLocale;
}
function getPathnameWithoutLocale(pathname) {
  const locale = getLocaleFromPathname(pathname);
  if (locale === defaultLocale) {
    return pathname;
  }
  return pathname.replace(`/${locale}`, "") || "/";
}
function getPathnameWithLocale(pathname, locale) {
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  if (locale === defaultLocale) {
    return pathnameWithoutLocale;
  }
  return `/${locale}${pathnameWithoutLocale}`;
}
function LanguageHandler({ children }) {
  const navigate = useNavigate();
  const params = useParams();
  const lang = params.lang;
  useEffect(() => {
    if (lang && !isValidLocale(lang)) {
      navigate("/", { replace: true });
      return;
    }
    if (lang === defaultLocale) {
      navigate("/", { replace: true });
      return;
    }
  }, [lang, navigate]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const MotionContext = createContext(void 0);
function MotionProvider({ children }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handleChange = (e) => {
      setReduceMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const toggleMotion = () => {
    setReduceMotion((prev) => !prev);
  };
  return /* @__PURE__ */ jsx(MotionContext.Provider, { value: { reduceMotion, toggleMotion }, children });
}
function useMotionPreference() {
  const context = useContext(MotionContext);
  if (context === void 0) {
    throw new Error("useMotionPreference must be used within a MotionProvider");
  }
  return context;
}
const root = UNSAFE_withComponentProps(function Root() {
  const location = useLocation();
  const {
    i18n: i18n2
  } = useTranslation();
  const locale = getLocaleFromPathname(location.pathname);
  useEffect(() => {
    if (i18n2.language !== locale) {
      i18n2.changeLanguage(locale);
    }
  }, [locale, i18n2]);
  return /* @__PURE__ */ jsxs("html", {
    lang: locale,
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(MotionProvider, {
        children: /* @__PURE__ */ jsx(LanguageHandler, {
          children: /* @__PURE__ */ jsx(Outlet, {})
        })
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function Wave({
  className,
  wave1Color = "#ffffff",
  wave2Color = "#89c8e1",
  wave3Color = "#4cc0fb",
  scrollContainerRef
}) {
  const { scrollY } = useScroll({
    container: scrollContainerRef
  });
  const wave1Y = useTransform(scrollY, [0, 1e3], [70, 70 - 1e3 * 0.15]);
  const wave2Y = useTransform(scrollY, [0, 1e3], [70, 70 - 1e3 * 0.1]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      id: "wave",
      viewBox: "0 0 1440 270",
      version: "1.1",
      className,
      "aria-hidden": "true",
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx(
          motion.path,
          {
            style: { y: wave1Y },
            fill: wave1Color,
            d: "M0,90L60,80C120,70,240,50,360,55C480,60,600,90,720,85C840,80,960,40,1080,35C1200,30,1320,60,1440,75C1560,90,1680,90,1800,110C1920,130,2040,170,2160,200C2280,230,2400,250,2520,230C2640,210,2760,150,2880,130C3000,110,3120,130,3240,115C3360,100,3480,50,3600,50C3720,50,3840,100,3960,135C4080,170,4200,190,4320,170C4440,150,4560,90,4680,85C4800,80,4920,130,5040,140C5160,150,5280,120,5400,130C5520,140,5640,190,5760,215C5880,240,6000,240,6120,210C6240,180,6360,120,6480,100C6600,80,6720,100,6840,120C6960,140,7080,160,7200,170C7320,180,7440,180,7560,150C7680,120,7800,60,7920,60C8040,60,8160,120,8280,155C8400,190,8520,200,8580,205L8640,210L8640,300L8580,300C8520,300,8400,300,8280,300C8160,300,8040,300,7920,300C7800,300,7680,300,7560,300C7440,300,7320,300,7200,300C7080,300,6960,300,6840,300C6720,300,6600,300,6480,300C6360,300,6240,300,6120,300C6000,300,5880,300,5760,300C5640,300,5520,300,5400,300C5280,300,5160,300,5040,300C4920,300,4800,300,4680,300C4560,300,4440,300,4320,300C4200,300,4080,300,3960,300C3840,300,3720,300,3600,300C3480,300,3360,300,3240,300C3120,300,3000,300,2880,300C2760,300,2640,300,2520,300C2400,300,2280,300,2160,300C2040,300,1920,300,1800,300C1680,300,1560,300,1440,300C1320,300,1200,300,1080,300C960,300,840,300,720,300C600,300,480,300,360,300C240,300,120,300,60,300L0,300Z"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.path,
          {
            style: { y: wave2Y },
            fill: wave2Color,
            d: "M0,210L60,190C120,170,240,130,360,130C480,130,600,170,720,155C840,140,960,70,1080,65C1200,60,1320,120,1440,140C1560,160,1680,140,1800,135C1920,130,2040,140,2160,165C2280,190,2400,230,2520,240C2640,250,2760,230,2880,220C3000,210,3120,210,3240,185C3360,160,3480,110,3600,110C3720,110,3840,160,3960,155C4080,150,4200,90,4320,100C4440,110,4560,190,4680,220C4800,250,4920,230,5040,220C5160,210,5280,210,5400,205C5520,200,5640,190,5760,155C5880,120,6000,60,6120,60C6240,60,6360,120,6480,155C6600,190,6720,200,6840,185C6960,170,7080,130,7200,95C7320,60,7440,30,7560,45C7680,60,7800,120,7920,120C8040,120,8160,60,8280,55C8400,50,8520,100,8580,125L8640,150L8640,300L8580,300C8520,300,8400,300,8280,300C8160,300,8040,300,7920,300C7800,300,7680,300,7560,300C7440,300,7320,300,7200,300C7080,300,6960,300,6840,300C6720,300,6600,300,6480,300C6360,300,6240,300,6120,300C6000,300,5880,300,5760,300C5640,300,5520,300,5400,300C5280,300,5160,300,5040,300C4920,300,4800,300,4680,300C4560,300,4440,300,4320,300C4200,300,4080,300,3960,300C3840,300,3720,300,3600,300C3480,300,3360,300,3240,300C3120,300,3000,300,2880,300C2760,300,2640,300,2520,300C2400,300,2280,300,2160,300C2040,300,1920,300,1800,300C1680,300,1560,300,1440,300C1320,300,1200,300,1080,300C960,300,840,300,720,300C600,300,480,300,360,300C240,300,120,300,60,300L0,300Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            style: { transform: "translate(0, 100px)" },
            fill: wave3Color,
            d: "M0,120L60,135C120,150,240,180,360,175C480,170,600,130,720,120C840,110,960,130,1080,135C1200,140,1320,130,1440,115C1560,100,1680,80,1800,100C1920,120,2040,180,2160,170C2280,160,2400,80,2520,45C2640,10,2760,20,2880,35C3000,50,3120,70,3240,70C3360,70,3480,50,3600,75C3720,100,3840,170,3960,195C4080,220,4200,200,4320,190C4440,180,4560,180,4680,180C4800,180,4920,180,5040,195C5160,210,5280,240,5400,240C5520,240,5640,210,5760,205C5880,200,6000,220,6120,235C6240,250,6360,260,6480,250C6600,240,6720,210,6840,210C6960,210,7080,240,7200,240C7320,240,7440,210,7560,180C7680,150,7800,120,7920,130C8040,140,8160,190,8280,215C8400,240,8520,240,8580,240L8640,240L8640,300L8580,300C8520,300,8400,300,8280,300C8160,300,8040,300,7920,300C7800,300,7680,300,7560,300C7440,300,7320,300,7200,300C7080,300,6960,300,6840,300C6720,300,6600,300,6480,300C6360,300,6240,300,6120,300C6000,300,5880,300,5760,300C5640,300,5520,300,5400,300C5280,300,5160,300,5040,300C4920,300,4800,300,4680,300C4560,300,4440,300,4320,300C4200,300,4080,300,3960,300C3840,300,3720,300,3600,300C3480,300,3360,300,3240,300C3120,300,3000,300,2880,300C2760,300,2640,300,2520,300C2400,300,2280,300,2160,300C2040,300,1920,300,1800,300C1680,300,1560,300,1440,300C1320,300,1200,300,1080,300C960,300,840,300,720,300C600,300,480,300,360,300C240,300,120,300,60,300L0,300Z"
          }
        )
      ]
    }
  );
}
function WelcomeSection({ scrollContainerRef }) {
  const { t } = useTranslation();
  const [isFixed, setIsFixed] = useState(true);
  const { scrollY } = useScroll({
    container: scrollContainerRef
  });
  const textOpacity = useTransform(
    scrollY,
    [
      0,
      typeof window !== "undefined" ? window.innerHeight * 0.3 : 300,
      typeof window !== "undefined" ? window.innerHeight * 0.4 : 400
    ],
    [1, 1, 0]
  );
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (typeof window !== "undefined") {
        setIsFixed(latest < window.innerHeight * 0.4);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen bg-primary-bg", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        style: { opacity: textOpacity },
        className: clsx(
          "h-screen w-full flex items-center justify-center px-6 z-10 pointer-events-none",
          isFixed ? "fixed top-0 left-0" : "absolute top-0 left-0"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-6xl md:text-8xl font-bold text-primary-text mb-4 opacity-70", children: [
            t("firstName"),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary-text", children: t("lastName") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-4xl text-primary-text font-light opacity-90", children: t("jobTitle") })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Wave,
      {
        className: "absolute bottom-0 left-0 w-full pointer-events-none z-20",
        scrollContainerRef
      }
    )
  ] });
}
const SvgFlagUk = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", ...props }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "circle" }, /* @__PURE__ */ React.createElement("circle", { cx: 50, cy: 50, r: 50 }))), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#circle)" }, /* @__PURE__ */ React.createElement("rect", { width: 100, height: 100, fill: "#012169" }), /* @__PURE__ */ React.createElement("path", { d: "M0,0 L100,100 M100,0 L0,100", stroke: "#fff", strokeWidth: 20 }), /* @__PURE__ */ React.createElement("clipPath", { id: "t" }, /* @__PURE__ */ React.createElement("path", { d: "M50,0 v100 M0,50 h100" })), /* @__PURE__ */ React.createElement("path", { d: "M0,0 L100,100 M100,0 L0,100", stroke: "#C8102E", strokeWidth: 12 }), /* @__PURE__ */ React.createElement("path", { d: "M50,0 v100 M0,50 h100", stroke: "#fff", strokeWidth: 33 }), /* @__PURE__ */ React.createElement("path", { d: "M50,0 v100 M0,50 h100", stroke: "#C8102E", strokeWidth: 20 })));
const SvgFlagFrance = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", ...props }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "circle" }, /* @__PURE__ */ React.createElement("circle", { cx: 50, cy: 50, r: 50 }))), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#circle)" }, /* @__PURE__ */ React.createElement("rect", { width: 100, height: 100, fill: "#ED2939" }), /* @__PURE__ */ React.createElement("rect", { width: 66.66, height: 100, fill: "#fff" }), /* @__PURE__ */ React.createElement("rect", { width: 33.33, height: 100, fill: "#002395" })));
const SvgFlagSpain = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", ...props }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "circle" }, /* @__PURE__ */ React.createElement("circle", { cx: 50, cy: 50, r: 50 }))), /* @__PURE__ */ React.createElement("g", { clipPath: "url(#circle)" }, /* @__PURE__ */ React.createElement("rect", { width: 100, height: 100, fill: "#AA151B" }), /* @__PURE__ */ React.createElement("rect", { width: 100, height: 50, y: 25, fill: "#F1BF00" })));
const FLAGS = {
  en: SvgFlagUk,
  fr: SvgFlagFrance,
  es: SvgFlagSpain
};
function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n: i18n2, t } = useTranslation();
  const currentLocale = getLocaleFromPathname(location.pathname);
  const changeLanguage = (locale) => {
    const newPathname = getPathnameWithLocale(location.pathname, locale);
    i18n2.changeLanguage(locale);
    navigate(newPathname);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);
  const CurrentFlag = FLAGS[currentLocale];
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-text rounded",
        "aria-label": t("languageSwitcher.changeLanguage"),
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        "aria-controls": "language-dropdown",
        children: /* @__PURE__ */ jsx(CurrentFlag, { className: "w-8 h-8 saturate-75 brightness-105", "aria-label": `Current language: ${currentLocale}` })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-white rotate-45 shadow-lg", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          id: "language-dropdown",
          role: "menu",
          className: "relative bg-white rounded-2xl shadow-lg px-2 py-2 flex gap-2",
          children: supportedLocales.filter((locale) => locale !== currentLocale).map((locale) => {
            const FlagComponent = FLAGS[locale];
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => changeLanguage(locale),
                className: "p-1 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-text rounded",
                "aria-label": t("languageSwitcher.switchTo", { locale }),
                role: "menuitem",
                children: /* @__PURE__ */ jsx(FlagComponent, { className: "w-6 h-6 saturate-75 brightness-105" })
              },
              locale
            );
          })
        }
      )
    ] })
  ] });
}
function Header() {
  const { reduceMotion, toggleMotion } = useMotionPreference();
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-transparent", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-4 flex justify-between items-center", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleMotion,
        className: "text-primary-text hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-text rounded p-1",
        "aria-label": reduceMotion ? "Enable animations" : "Disable animations",
        title: reduceMotion ? "Enable animations" : "Disable animations",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: reduceMotion ? (
              // Play icon (animations disabled, click to enable)
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              )
            ) : (
              // Pause icon (animations enabled, click to disable)
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              )
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex-1" }),
    /* @__PURE__ */ jsx(LanguageSwitcher, {})
  ] }) });
}
function ProjectCard({
  title,
  description,
  technologies,
  image = "https://via.placeholder.com/600x400",
  href
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-lg",
      "aria-label": `${title} - ${description} (opens in new window)`,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative w-full h-80 overflow-hidden rounded-lg shadow-lg",
          onHoverStart: () => setIsHovered(true),
          onHoverEnd: () => setIsHovered(false),
          onFocus: () => setIsHovered(true),
          onBlur: () => setIsHovered(false),
          tabIndex: -1,
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute inset-0",
                animate: {
                  x: shouldReduceMotion ? "0%" : isHovered ? "-100%" : "0%"
                },
                transition: { duration: 0.5, ease: "easeInOut" },
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: image,
                    alt: `${title} project screenshot`,
                    className: "w-full h-full object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "absolute inset-0 bg-primary-text p-8 flex flex-col justify-center",
                initial: { x: "100%" },
                animate: {
                  x: shouldReduceMotion ? "100%" : isHovered ? "0%" : "100%"
                },
                transition: { duration: 0.5, ease: "easeInOut" },
                "aria-hidden": !isHovered,
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: title }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/90 mb-6 text-base leading-relaxed", children: description }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: technologies.map((tech, index) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "px-3 py-1 bg-white/20 text-white text-sm rounded-full",
                      children: tech
                    },
                    index
                  )) })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function CarouselFreeScroll({
  projects: projects2
}) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const duplicatedProjects = [...projects2, ...projects2, ...projects2];
  const cardWidth = 384;
  const gap = 32;
  const itemWidth = cardWidth + gap;
  const totalWidth = projects2.length * itemWidth;
  const navigateToCard = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const targetX = -(projects2.length * itemWidth + index * itemWidth) + centerOffset;
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
  };
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const initialX = -totalWidth + centerOffset;
    x.set(initialX);
    const handleWheel = (e) => {
      if (e.deltaX !== 0) {
        e.preventDefault();
        e.stopPropagation();
        const currentX = x.get();
        const newX = currentX - e.deltaX;
        if (Math.abs(newX) >= totalWidth) {
          x.set(newX % totalWidth);
        } else if (newX > 0) {
          x.set(newX - totalWidth);
        } else {
          x.set(newX);
        }
      }
    };
    const handleKeyDown = (e) => {
      if (focusedIndex === null) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = Math.max(0, focusedIndex - 1);
        setFocusedIndex(newIndex);
        navigateToCard(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = Math.min(projects2.length - 1, focusedIndex + 1);
        setFocusedIndex(newIndex);
        navigateToCard(newIndex);
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
        navigateToCard(0);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIndex = projects2.length - 1;
        setFocusedIndex(lastIndex);
        navigateToCard(lastIndex);
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [x, totalWidth, focusedIndex, projects2.length]);
  const handleDragEnd = () => {
    const currentX = x.get();
    if (Math.abs(currentX) >= totalWidth) {
      x.set(currentX % totalWidth);
    } else if (currentX > 0) {
      x.set(currentX - totalWidth);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "absolute inset-0 overflow-hidden",
      role: "region",
      "aria-label": "Project carousel - Use arrow keys to navigate. This carousel displays projects in an infinite loop.",
      tabIndex: 0,
      onFocus: () => {
        if (focusedIndex === null) {
          setFocusedIndex(0);
          navigateToCard(0);
        }
      },
      onBlur: (e) => {
        if (!containerRef.current?.contains(e.relatedTarget)) {
          setFocusedIndex(null);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex gap-8 absolute cursor-grab active:cursor-grabbing h-full items-center",
            style: { x },
            drag: "x",
            dragConstraints: { left: -totalWidth * 2, right: 0 },
            onDragEnd: handleDragEnd,
            dragElastic: 0.1,
            dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
            children: duplicatedProjects.map((project, index) => {
              const isMiddleSet = index >= projects2.length && index < projects2.length * 2;
              index % projects2.length;
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-100 h-80 flex-shrink-0",
                  "aria-hidden": !isMiddleSet,
                  children: /* @__PURE__ */ jsx(
                    ProjectCard,
                    {
                      title: project.title,
                      description: project.description,
                      technologies: project.technologies,
                      image: project.image,
                      href: project.href
                    }
                  )
                },
                index
              );
            })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: focusedIndex !== null && `Viewing project ${focusedIndex + 1} of ${projects2.length}: ${projects2[focusedIndex]?.title}` })
      ]
    }
  );
}
const canalPlusImage = "/assets/canalplus-BSQ3VCAF.png";
const canalPlusTVImage = "/assets/canalplus_tv-zexcc7rB.png";
const shadowImage = "/assets/shadow-BpQ2pwxI.png";
const stonalImage = "/assets/stonal-B0wn1Y6e.png";
function PortfolioSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();
  const projectsData = [
    {
      title: t("portfolio.canalplus.title"),
      description: t("portfolio.canalplus.description"),
      technologies: [
        "React",
        "Typescript",
        "Redux",
        "Webpack",
        "Lerna",
        "Jest"
      ],
      image: canalPlusImage,
      href: "https://www.canalplus.com"
    },
    {
      title: t("portfolio.canalplusTv.title"),
      description: t("portfolio.canalplusTv.description"),
      technologies: ["React", "Typescript", "Redux", "Webpack"],
      image: canalPlusTVImage,
      href: "https://www.canalplus.com"
    },
    {
      title: t("portfolio.shadow.title"),
      description: t("portfolio.shadow.description"),
      technologies: ["React", "Typescript", "Next.Js", "Jest", "GitlabCI"],
      image: shadowImage,
      href: "https://shadow.tech"
    },
    {
      title: t("portfolio.stonal.title"),
      description: t("portfolio.stonal.description"),
      technologies: ["React", "Typescript", "Angular", "Vite", "Redux"],
      image: stonalImage,
      href: "https://www.stonal.com"
    }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "relative w-full h-screen bg-gradient-to-b from-blue-wave to-blue-600",
      "aria-labelledby": "portfolio-heading",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: shouldReduceMotion ? {} : { opacity: 0, scale: 0.5 },
          whileInView: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
          viewport: { once: false, amount: 0.8 },
          transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          },
          className: "w-full h-full flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "portfolio-heading",
                  className: "relative text-4xl font-bold pt-28 pb-12 text-white text-center z-10",
                  children: t("portfolio.title")
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm",
                  "aria-hidden": "true",
                  children: t("portfolio.title")
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(CarouselFreeScroll, { projects: projectsData }) })
          ]
        }
      )
    }
  );
}
function SkillCard({ name, icon }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-3 bg-white-10 backdrop-blur-sm px-4 py-3 rounded-full border border-white-20 hover:bg-white-20 focus-within:bg-white-20 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-600 transition-colors",
      tabIndex: 0,
      role: "button",
      "aria-label": `${name} technology`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center p-1", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: icon,
            alt: `${name} logo`,
            className: "w-3/4 h-3/4 object-contain"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: name })
      ]
    }
  );
}
const skillsData = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg"
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    name: "GitLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg"
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
  }
];
function SkillsSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "relative w-full h-screen bg-gradient-to-b from-blue-600 to-blue-700",
      "aria-labelledby": "skills-heading",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: shouldReduceMotion ? {} : { opacity: 0, scale: 0.5 },
          whileInView: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
          viewport: { once: false, amount: 0.8 },
          transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          },
          className: "w-full h-full flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "skills-heading",
                  className: "relative text-4xl font-bold pt-28 pb-12 text-white text-center z-10",
                  children: t("skills.title")
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm",
                  "aria-hidden": "true",
                  children: t("skills.title")
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl w-full flex flex-wrap gap-4 justify-center", children: skillsData.map((skill, index) => /* @__PURE__ */ jsx(SkillCard, { name: skill.name, icon: skill.icon }, index)) }) })
          ]
        }
      )
    }
  );
}
function ContactSection() {
  const { t } = useTranslation();
  const { reduceMotion: shouldReduceMotion } = useMotionPreference();
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "relative w-full h-screen bg-gradient-to-b from-blue-700 to-blue-900",
      "aria-labelledby": "contact-heading",
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: shouldReduceMotion ? {} : { opacity: 0, scale: 0.5 },
          whileInView: shouldReduceMotion ? {} : { opacity: 1, scale: 1 },
          viewport: { once: false, amount: 0.8 },
          transition: {
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          },
          className: "w-full h-full flex flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "contact-heading",
                  className: "relative text-4xl font-bold pt-28 pb-12 text-white text-center z-10",
                  children: t("contact.title")
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute text-[120px] lg:text-[180px] font-black opacity-10 uppercase top-28 left-1/2 -translate-x-1/2 z-0 pointer-events-none blur-sm",
                  "aria-hidden": "true",
                  children: t("contact.title")
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-6 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 text-center mb-3", children: t("contact.description.get_in_touch") }),
              /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 text-center mb-12", children: t("contact.description.connect") }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 justify-center", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "mailto:etiennechesnaypro@proton.me",
                    className: "flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-none text-white font-semibold rounded-lg transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-6 h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            }
                          )
                        }
                      ),
                      t("contact.email")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://www.linkedin.com/in/etienne-chesnay",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center justify-center gap-3 px-8 py-4 bg-linkedin hover:bg-linkedin-hover focus:ring-2 focus:ring-white focus:outline-none text-white font-semibold rounded-lg transition-colors",
                    "aria-label": `${t("contact.linkedin")} (opens in new window)`,
                    children: [
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "w-6 h-6",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" })
                        }
                      ),
                      t("contact.linkedin")
                    ]
                  }
                )
              ] })
            ] }) })
          ]
        }
      )
    }
  );
}
const home = UNSAFE_withComponentProps(function Home() {
  const scrollContainerRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", {
    ref: scrollContainerRef,
    className: "h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth",
    children: [/* @__PURE__ */ jsx("a", {
      href: "#main-content",
      className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-primary-text focus:px-4 focus:py-2 focus:rounded",
      children: "Skip to main content"
    }), /* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsxs("main", {
      id: "main-content",
      children: [/* @__PURE__ */ jsx("div", {
        className: "snap-start",
        children: /* @__PURE__ */ jsx(WelcomeSection, {
          scrollContainerRef
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "snap-start",
        children: /* @__PURE__ */ jsx(PortfolioSection, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "snap-start",
        children: /* @__PURE__ */ jsx(SkillsSection, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "snap-start",
        children: /* @__PURE__ */ jsx(ContactSection, {})
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const catchAll = UNSAFE_withComponentProps(function CatchAll() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", {
      replace: true
    });
  }, [navigate]);
  return null;
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: catchAll
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BBaaEwdg.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-UIGDSWPH-DNrqB-Gc.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-CdmWnCU_.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-UIGDSWPH-DNrqB-Gc.js", "/assets/MotionContext-DzyIRSZl.js"], "css": ["/assets/root-Dh4v21un.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": ":lang?", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-RK-PII80.js", "imports": ["/assets/chunk-UIGDSWPH-DNrqB-Gc.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/MotionContext-DzyIRSZl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/catch-all": { "id": "routes/catch-all", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/catch-all-CiW-yms4.js", "imports": ["/assets/chunk-UIGDSWPH-DNrqB-Gc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-08143999.js", "version": "08143999", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: ":lang?",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/catch-all": {
    id: "routes/catch-all",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
