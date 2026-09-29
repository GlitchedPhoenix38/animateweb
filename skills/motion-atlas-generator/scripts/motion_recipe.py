#!/usr/bin/env python3
import argparse
import json

ACCENTS = {
    "blue": "#6EA8FF",
    "cyan": "#67E8F9",
    "violet": "#A78BFA",
    "gold": "#F5C16C",
}

TYPE_DEFAULTS = {
    "micro": {"duration": 0.28, "motion": "scale + lift", "spring": True},
    "loader": {"duration": 2.4, "motion": "loop + pulse", "spring": False},
    "transition": {"duration": 0.72, "motion": "fade + slide + blur", "spring": False},
    "scroll": {"duration": 0.74, "motion": "fade + slide", "spring": False},
    "hover": {"duration": 0.28, "motion": "scale + glow border", "spring": True},
}


def build_recipe(name, pattern_type, feel, accent):
    defaults = TYPE_DEFAULTS.get(pattern_type, TYPE_DEFAULTS["micro"])
    accent_hex = ACCENTS.get(accent, ACCENTS["blue"])
    slug = name.lower().replace(" ", "-")

    recipe = {
        "id": slug,
        "name": name,
        "type": pattern_type,
        "feel": feel,
        "accent": accent_hex,
        "tokens": {
            "duration": defaults["duration"],
            "ease": [0.16, 1, 0.3, 1],
            "spring": {
                "stiffness": 360 if defaults["spring"] else None,
                "damping": 24 if defaults["spring"] else None,
            },
            "motion": defaults["motion"],
        },
        "framer": framer_snippet(slug, pattern_type, defaults),
        "css": css_snippet(slug, pattern_type, defaults, accent_hex),
        "tailwind": tailwind_snippet(pattern_type, accent),
        "reducedMotion": "Disable parallax, large transforms, and infinite decorative loops. Preserve opacity feedback.",
    }

    return recipe


def framer_snippet(slug, pattern_type, defaults):
    if pattern_type == "loader":
        return (
            f"<motion.div className=\"{slug}\" animate={{{{ rotate: 360 }}}} "
            "transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }} />"
        )

    if defaults["spring"]:
        return (
            f"const {slug.replace('-', '')} = {{\n"
            "  rest: { scale: 1, y: 0 },\n"
            "  hover: { scale: 1.04, y: -3 },\n"
            "  tap: { scale: 0.98 }\n"
            "};"
        )

    return (
        f"const {slug.replace('-', '')} = {{\n"
        "  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },\n"
        "  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }\n"
        "};"
    )


def css_snippet(slug, pattern_type, defaults, accent):
    if pattern_type == "loader":
        return (
            f"@keyframes {slug}-orbit {{ to {{ transform: rotate(360deg); }} }}\n"
            f".{slug} {{ animation: {slug}-orbit {defaults['duration']}s linear infinite; }}"
        )

    return (
        f".{slug} {{ transition: transform {int(defaults['duration'] * 1000)}ms "
        "cubic-bezier(.16,1,.3,1), box-shadow 280ms ease; }\n"
        f".{slug}:hover {{ transform: translateY(-3px) scale(1.04); "
        f"box-shadow: 0 0 40px color-mix(in srgb, {accent} 32%, transparent); }}"
    )


def tailwind_snippet(pattern_type, accent):
    if pattern_type == "loader":
        return "relative size-32 rounded-full border border-white/10 [animation:spin_2.4s_linear_infinite]"

    return (
        "rounded-[1.75rem] border border-white/10 bg-white/[0.055] "
        f"shadow-glass backdrop-blur-glass transition hover:border-atlas-{accent}/55 "
        "hover:-translate-y-2 hover:scale-[1.015]"
    )


def main():
    parser = argparse.ArgumentParser(description="Generate a Motion Atlas animation recipe.")
    parser.add_argument("--name", required=True)
    parser.add_argument("--type", default="micro", choices=sorted(TYPE_DEFAULTS.keys()))
    parser.add_argument("--feel", default="premium")
    parser.add_argument("--accent", default="blue", choices=sorted(ACCENTS.keys()))
    parser.add_argument("--format", default="json", choices=["json", "framer", "css", "tailwind"])
    args = parser.parse_args()

    recipe = build_recipe(args.name, args.type, args.feel, args.accent)

    if args.format == "json":
        print(json.dumps(recipe, indent=2))
    else:
        print(recipe[args.format])


if __name__ == "__main__":
    main()
