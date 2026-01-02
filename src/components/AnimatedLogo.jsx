import React from 'react'
import { motion } from 'framer-motion'
import './AnimatedLogo.css'

const AnimatedLogo = () => {
    // SVG ViewBox dimensions - abstract units
    // We'll center the text roughly.
    // Letters are ~20 units wide, 40 units high. 
    // Spacing ~10.
    // "smalltool" = 9 letters. 
    // Approx width = 9 * 25 = 225.
    // Let's use viewBox="0 0 300 100" and center it.

    const strokeColor = "#ffffff"
    const strokeWidth = 2

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.1, duration: 0.01 }
            }
        })
    }

    const lineDraw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { delay: 1, duration: 2, ease: "easeInOut" }
        }
    }

    // Custom paths for "smalltool"
    // S: 20,40 -> ... complex curve. Simplified:
    const sPath = "M 30,30 C 20,30 20,40 30,45 C 40,50 40,60 30,60 C 20,60 20,50 25,48"

    // m: 50,60 -> 50,30 -> 60,30 -> 60,60 -> 60,30 -> 70,30 -> 70,60
    // Simplified m
    const mPath = "M 50,60 L 50,30 L 60,30 L 60,60 M 60,30 L 70,30 L 70,60"

    // a: circle + line
    const aPath = "M 95,60 L 95,40 C 95,30 80,30 80,45 C 80,60 95,60 95,60"

    // l
    const lPath1 = "M 110,60 L 110,10"

    // l
    const lPath2 = "M 130,60 L 130,10"

    // t: The crossbar will be the "line around". Vertical stroke standard.
    const tVert = "M 155,60 L 155,20"
    // tCross: Special huge line. 
    // Starts far left, goes through T, goes far right.
    // In SVG coords (0,0 to 300,100), we can extend it way out.
    // Let's say the viewBox will be preserved, but we want it to look like it wraps?
    // Actually, user said lines "go all the way around".
    // Let's make the t-crossbar part of a huge rectangle that frames the screen.
    // Start at T center (155, 30), go Right to edge, go Down to bottom, go Left to start, go Up...

    // Let's make the T-crossbar extend to the Right edge of the local group, then turn down, then wrap around the whole logo?
    // Or simpler: Just a very long line for now that goes off screen.
    // "M 140,30 L 170,30" is normal. 
    // Let's do: "M -1000,30 L 3000,30" for the infinite line effect.
    const tCross = "M -500,30 L 800,30"

    // o
    const oPath1 = "M 190,45 A 10 10 0 1 0 190 45.1" // full circle approx

    // o
    const oPath2 = "M 220,45 A 10 10 0 1 0 220 45.1"

    // l (last): The "L" line.
    // Standard L is vertical. 
    // Let's make this one wrap around the bottom and left.
    // Start top (240, 10), go down to baseline (240, 60), then Turn Left and go under everything.
    const lPath3 = "M 250,10 L 250,75 L 20,75 L 20,20 L 250,20" // A box around the text!

    return (
        <div className="logo-container">
            <motion.svg
                width="600"
                height="200"
                viewBox="0 0 300 100"
                initial="hidden"
                animate="visible"
                className="logo-svg"
            >
                {/* S */}
                <motion.path d={sPath} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={0} />

                {/* M */}
                <motion.path d={mPath} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={1} />

                {/* A */}
                <motion.path d={aPath} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={2} />

                {/* L */}
                <motion.path d={lPath1} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={3} />

                {/* L */}
                <motion.path d={lPath2} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={4} />

                {/* T - Vertical */}
                <motion.path d={tVert} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={5} />

                {/* T - Crossbar (Infinite Line) */}
                <motion.path d={tCross} stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={lineDraw} />

                {/* O */}
                <motion.path d="M 195,45 a 10,10 0 1,0 -20,0 a 10,10 0 1,0 20,0" stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={6} />

                {/* O */}
                <motion.path d="M 225,45 a 10,10 0 1,0 -20,0 a 10,10 0 1,0 20,0" stroke={strokeColor} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round" variants={draw} custom={7} />

                {/* L - Wrapping Line */}
                {/* M 250,10 L 250,75 (down), L 0,75 (left under text), L 0,10 (up left side), L 250,10 (top closure?) - Wait, T cross is at 30. L Top at 20? */}
                {/* Let's make the L wrap nicely. */}
                <motion.path
                    d="M 250,10 L 250,85 L 10,85 L 10,10"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeLinecap="round"
                    strokeLinejoin="round" // Sharp corners for the box
                    variants={lineDraw}
                />

            </motion.svg>
        </div>
    )
}

export default AnimatedLogo
