"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  PERSONAL_PROJECTS,
  type ProjectIdentity,
} from "@/data/projects";
import { PROJECT_STACK_SEEN_KEY } from "@/lib/projectNavigation";
import { usePageTransition } from "@/context/PageTransitionContext";
import ProjectStackCard from "./ProjectStackCard";

const STACKED_PROJECTS = PERSONAL_PROJECTS;

export default function ProjectStack() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const isNavigatingRef = useRef(false);
  const [announcement, setAnnouncement] = useState("");

  const setCardRef = useCallback(
    (projectId: string, node: HTMLButtonElement | null) => {
      if (node) {
        cardRefs.current.set(projectId, node);
      } else {
        cardRefs.current.delete(projectId);
      }
    },
    []
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current) return;

      const card01 = cardRefs.current.get(PERSONAL_PROJECTS[0].id);
      const card02 = cardRefs.current.get(PERSONAL_PROJECTS[1].id);
      const card03 = cardRefs.current.get(PERSONAL_PROJECTS[2].id);

      if (!card01 || !card02 || !card03) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const getHeaderOffset = () => {
        if (window.innerWidth < 640) return 44;
        if (window.innerWidth < 1024) return 52;
        return 60;
      };

      const headerOffset = getHeaderOffset();

      gsap.set(card01, { y: 0, yPercent: 0 });
      gsap.set(card02, { yPercent: 100, y: 0 });
      gsap.set(card03, { yPercent: 100, y: 0 });

      if (prefersReducedMotion) {
        gsap.set(card02, { yPercent: 0, y: headerOffset });
        gsap.set(card03, { yPercent: 0, y: headerOffset * 2 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.5,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(card02, {
        yPercent: 0,
        y: headerOffset,
        ease: "none",
        duration: 1,
      });

      tl.to(card03, {
        yPercent: 0,
        y: headerOffset * 2,
        ease: "none",
        duration: 1,
      });
    },
    { scope: sectionRef }
  );

  useEffect(
    () => () => {
      cardRefs.current.forEach((card) => {
        gsap.killTweensOf(card);
      });
    },
    []
  );

  const previewProject = useCallback(
    (project: ProjectIdentity) => {
      if (isNavigatingRef.current) return;

      const card = cardRefs.current.get(project.id);
      if (!card) return;

      if (project.route) {
        router.prefetch(project.route);
      }

      gsap.killTweensOf(card, "scale");
      gsap.to(card, {
        scale: 1.01,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [router]
  );

  const endProjectPreview = useCallback(
    (project: ProjectIdentity) => {
      if (isNavigatingRef.current) return;

      const card = cardRefs.current.get(project.id);
      if (!card) return;

      gsap.killTweensOf(card, "scale");
      gsap.to(card, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    []
  );

  const { requestTransition } = usePageTransition();
  const pathname = usePathname();

  const activateProject = useCallback(
    (project: ProjectIdentity) => {
      if (isNavigatingRef.current) return;

      const selectedCard = cardRefs.current.get(project.id);
      if (!selectedCard) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!project.route) {
        setAnnouncement(
          `${project.title} does not have a project detail route yet.`
        );

        if (!prefersReducedMotion) {
          gsap.killTweensOf(selectedCard, "scale");
          gsap.to(selectedCard, {
            scale: 1.02,
            duration: 0.15,
            repeat: 1,
            yoyo: true,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
        return;
      }

      isNavigatingRef.current = true;
      setAnnouncement(`Opening ${project.title} project.`);
      sessionStorage.setItem(PROJECT_STACK_SEEN_KEY, "true");

      requestTransition(pathname, project.route, project.title, project.number);
    },
    [requestTransition, pathname]
  );

  return (
    <div
      ref={sectionRef}
      data-personal-projects-section
      className="relative w-full h-[260vh] sm:h-[300vh]"
    >
      <div
        ref={stageRef}
        data-sticky-stage
        className="box-border flex h-screen w-full flex-col items-center overflow-hidden"
        style={{
          paddingTop: "0px",
          paddingBottom: "calc(var(--page-padding-block) + 40px)",
        }}
      >
        <h2
          id="personal-projects-heading"
          className="relative z-35 shrink-0 text-center font-normal uppercase leading-none tracking-[-0.02em] text-text-primary"
          style={{
            fontSize: "clamp(32px, 4.8vw, 72px)",
            marginTop: "calc(var(--page-padding-block) + 48px)",
            marginBottom: "clamp(24px, 3.5vh, 40px)",
          }}
        >
          Personal Project
        </h2>

        {/* Shared Centered Stack Container: owns max-width, margin-inline: auto, and horizontal page inset */}
        <div
          data-centered-stack-container
          className="relative mx-auto flex min-h-0 w-full max-w-[var(--project-card-max-width)] flex-1 flex-col overflow-hidden px-[var(--page-padding-inline)]"
        >
          <div
            data-stack-viewport
            className="relative min-h-0 w-full flex-1 overflow-hidden"
          >
            {STACKED_PROJECTS.map((project, layer) => (
              <ProjectStackCard
                key={project.id}
                ref={(node) => {
                  setCardRef(project.id, node);
                }}
                project={project}
                layer={layer}
                onActivate={activateProject}
                onPreviewStart={previewProject}
                onPreviewEnd={endProjectPreview}
              />
            ))}
          </div>
        </div>
      </div>

      {announcement ? (
        <p
          data-project-route-status
          className="pointer-events-none fixed bottom-4 right-6 z-50 max-w-[70%] rounded-lg bg-base-dark/90 px-4 py-2 text-right text-xs font-semibold uppercase leading-[1.25] tracking-normal text-surface-soft-blue backdrop-blur-sm sm:bottom-6 sm:right-8 sm:text-sm"
          aria-live="polite"
        >
          {announcement}
        </p>
      ) : null}

      <style>{`
        [data-project-stack-card] {
          height: calc(100% - 120px);
          min-height: 280px;
        }

        [data-project-card-spine] { padding-inline: 32px; }
        [data-project-card-cover] { padding: 0px; }

        @media (max-width: 639px) {
          [data-project-stack-card] {
            height: calc(100% - 88px);
            min-height: 240px;
          }

          [data-project-card-spine] { padding-inline: 16px; }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          [data-project-stack-card] {
            height: calc(100% - 104px);
            min-height: 260px;
          }

          [data-project-card-spine] { padding-inline: 24px; }
        }
      `}</style>
    </div>
  );
}
