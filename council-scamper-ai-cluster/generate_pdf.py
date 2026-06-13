#!/usr/bin/env python3
"""
SCAMPER Audit PDF Generator
AI Learning Cluster Prototype
Uses reportlab to produce a clean A4 print-ready PDF.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus.flowables import Flowable
import os

# ── Colours ─────────────────────────────────────────────────────
NAVY       = colors.HexColor("#1a1a2e")
CORAL      = colors.HexColor("#e94560")
WARM_WHITE = colors.HexColor("#f5f5f0")
DARK_BLUE  = colors.HexColor("#16213e")
MIDNIGHT   = colors.HexColor("#0f3460")
PURPLE     = colors.HexColor("#533483")
MARIT_C    = colors.HexColor("#0f3460")
YAEL_C     = colors.HexColor("#533483")
DAAN_C     = colors.HexColor("#e94560")
YES_C      = colors.HexColor("#2a9d5c")
NO_C       = colors.HexColor("#c0392b")
COND_C     = colors.HexColor("#e67e22")
LIGHT_GRAY = colors.HexColor("#eeeeea")
MID_GRAY   = colors.HexColor("#cccccc")
TEXT_SEC   = colors.HexColor("#4a4a6a")

# ── Output path ──────────────────────────────────────────────────
OUT_DIR  = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(OUT_DIR, "scamper-audit-print.pdf")

# ── Page geometry ────────────────────────────────────────────────
LEFT_M  = 22*mm
RIGHT_M = 22*mm
TOP_M   = 22*mm
BOT_M   = 22*mm

# ── Colour bar flowable ──────────────────────────────────────────
class ColourBar(Flowable):
    def __init__(self, width, height, colour):
        super().__init__()
        self.width  = width
        self.height = height
        self.colour = colour

    def draw(self):
        self.canv.setFillColor(self.colour)
        self.canv.rect(0, 0, self.width, self.height, stroke=0, fill=1)


class LeftBar(Flowable):
    """Thin vertical accent bar, drawn at left of wrapped paragraph."""
    def __init__(self, content_height, colour, bar_width=3):
        super().__init__()
        self.content_height = content_height
        self.colour = colour
        self.bar_width = bar_width
        self.width = bar_width
        self.height = content_height

    def draw(self):
        self.canv.setFillColor(self.colour)
        self.canv.rect(0, 0, self.bar_width, self.content_height, stroke=0, fill=1)


# ── Style factory ────────────────────────────────────────────────
def build_styles():
    base = getSampleStyleSheet()

    def S(name, parent="Normal", **kw):
        return ParagraphStyle(name, parent=base[parent], **kw)

    return {
        "doc_title": S("doc_title",
            fontName="Helvetica-Bold", fontSize=26, leading=30,
            textColor=colors.white, spaceAfter=6),
        "doc_subtitle": S("doc_subtitle",
            fontName="Helvetica", fontSize=10, leading=14,
            textColor=colors.HexColor("#aaaacc"), spaceAfter=4),
        "meta_label": S("meta_label",
            fontName="Helvetica-Bold", fontSize=7, leading=9,
            textColor=colors.HexColor("#888899"), spaceAfter=1,
            wordWrap='LTR'),
        "meta_value": S("meta_value",
            fontName="Helvetica", fontSize=9, leading=12,
            textColor=colors.HexColor("#ccccdd"), spaceAfter=3),
        "section_label": S("section_label",
            fontName="Helvetica-Bold", fontSize=7, leading=9,
            textColor=CORAL, spaceAfter=3, wordWrap='LTR'),
        "h1": S("h1", "Heading1",
            fontName="Helvetica-Bold", fontSize=20, leading=24,
            textColor=NAVY, spaceBefore=10, spaceAfter=6),
        "h2": S("h2", "Heading2",
            fontName="Helvetica-Bold", fontSize=14, leading=17,
            textColor=NAVY, spaceBefore=12, spaceAfter=4),
        "h3": S("h3", "Heading3",
            fontName="Helvetica-Bold", fontSize=10, leading=13,
            textColor=NAVY, spaceBefore=8, spaceAfter=3),
        "h4": S("h4",
            fontName="Helvetica-Bold", fontSize=7.5, leading=10,
            textColor=TEXT_SEC, spaceBefore=4, spaceAfter=2, wordWrap='LTR'),
        "body": S("body",
            fontName="Helvetica", fontSize=9, leading=13.5,
            textColor=TEXT_SEC, spaceAfter=5, alignment=TA_JUSTIFY),
        "body_b": S("body_b",
            fontName="Helvetica-Bold", fontSize=9, leading=13.5,
            textColor=NAVY, spaceAfter=4),
        "body_i": S("body_i",
            fontName="Helvetica-Oblique", fontSize=8.5, leading=13,
            textColor=TEXT_SEC, spaceAfter=4, alignment=TA_JUSTIFY),
        "quote": S("quote",
            fontName="Helvetica-Oblique", fontSize=8.5, leading=13,
            textColor=TEXT_SEC, leftIndent=10, spaceAfter=5,
            borderPad=6, alignment=TA_JUSTIFY),
        "caption": S("caption",
            fontName="Helvetica", fontSize=7.5, leading=11,
            textColor=TEXT_SEC, spaceAfter=2),
        "caption_b": S("caption_b",
            fontName="Helvetica-Bold", fontSize=7.5, leading=11,
            textColor=NAVY, spaceAfter=2),
        "badge_yes": S("badge_yes",
            fontName="Helvetica-Bold", fontSize=7, leading=9,
            textColor=YES_C, spaceAfter=2, wordWrap='LTR'),
        "badge_no": S("badge_no",
            fontName="Helvetica-Bold", fontSize=7, leading=9,
            textColor=NO_C, spaceAfter=2, wordWrap='LTR'),
        "badge_cond": S("badge_cond",
            fontName="Helvetica-Bold", fontSize=7, leading=9,
            textColor=COND_C, spaceAfter=2, wordWrap='LTR'),
        "page_header": S("page_header",
            fontName="Helvetica", fontSize=7, leading=9,
            textColor=MID_GRAY, spaceAfter=0),
    }

ST = build_styles()

# ── Helper: coloured header box ──────────────────────────────────
def section_header_block(label_text, title_text, w):
    """Returns a KeepTogether block with label + rule + title."""
    return KeepTogether([
        Paragraph(label_text.upper(), ST["section_label"]),
        HRFlowable(width=w, thickness=0.5, color=CORAL, spaceAfter=4),
        Paragraph(title_text, ST["h2"]),
    ])


def rule(w, colour=LIGHT_GRAY, thickness=0.5, space=4):
    return HRFlowable(width=w, thickness=thickness, color=colour, spaceAfter=space)


def sp(h=4):
    return Spacer(1, h)


def vote_badge(vote):
    if vote == "YES":      return ("YES",   YES_C,  colors.HexColor("#e8f7ee"))
    if vote == "NO":       return ("NO",    NO_C,   colors.HexColor("#fdecea"))
    return ("CONDITIONAL", COND_C, colors.HexColor("#fef3e7"))


# ── Cover/Header section (navy box) ─────────────────────────────
def build_cover(story, w):
    # Navy background using a Table
    cover_data = [[
        Paragraph("SCAMPER AUDIT", ST["meta_label"]),
    ]]
    tbl = Table([[
        [
            Paragraph("SCAMPER AUDIT  ·  AI LEARNING CLUSTER PROTOTYPE", ST["meta_label"]),
            Spacer(1, 4),
            Paragraph("Three personas. Four components. Seven lenses.\nOne design question: who does this program actually serve?", ST["doc_title"]),
            Spacer(1, 6),
            Paragraph("25 March 2026  ·  Council Method  ·  Personas: Marit · Yael · Daan", ST["doc_subtitle"]),
        ]
    ]], colWidths=[w])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), NAVY),
        ("TOPPADDING",    (0,0), (-1,-1), 20),
        ("BOTTOMPADDING", (0,0), (-1,-1), 20),
        ("LEFTPADDING",   (0,0), (-1,-1), 18),
        ("RIGHTPADDING",  (0,0), (-1,-1), 18),
    ]))
    story.append(tbl)
    story.append(sp(14))


# ── Executive summary ────────────────────────────────────────────
def build_exec_summary(story, w):
    story.append(section_header_block("Executive Summary", "Final State at a Glance", w))
    story.append(sp(4))

    story.append(Paragraph("Final Commitment Votes", ST["h3"]))

    vote_rows = [
        [Paragraph("PERSONA", ST["h4"]), Paragraph("ROUND 1", ST["h4"]),
         Paragraph("ROUND 2", ST["h4"]), Paragraph("CHANGED?", ST["h4"])],
        [Paragraph("Marit", ST["body_b"]),
         Paragraph("CONDITIONAL", ST["badge_cond"]),
         Paragraph("CONDITIONAL", ST["badge_cond"]),
         Paragraph("No — condition deepened", ST["caption"])],
        [Paragraph("Yael", ST["body_b"]),
         Paragraph("CONDITIONAL", ST["badge_cond"]),
         Paragraph("YES", ST["badge_yes"]),
         Paragraph("Yes — Daan reframed Override Log as craft legitimacy tool", ST["caption"])],
        [Paragraph("Daan", ST["body_b"]),
         Paragraph("CONDITIONAL", ST["badge_cond"]),
         Paragraph("CONDITIONAL", ST["badge_cond"]),
         Paragraph("Sharpened — needs org adoption pathway, not just Advanced Track", ST["caption"])],
    ]

    col_w = [w*0.18, w*0.16, w*0.16, w*0.50]
    tbl = Table(vote_rows, colWidths=col_w, repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), NAVY),
        ("TEXTCOLOR",     (0,0), (-1,0), colors.white),
        ("ROWBACKGROUNDS",(0,1), (-1,-1), [colors.white, LIGHT_GRAY]),
        ("GRID",          (0,0), (-1,-1), 0.4, MID_GRAY),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 6),
        ("RIGHTPADDING",  (0,0), (-1,-1), 6),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]))
    story.append(tbl)
    story.append(sp(10))

    story.append(Paragraph("Sharpest Insight", ST["h3"]))
    story.append(Paragraph(
        "The Override Log is simultaneously the program's most valuable component and its most dangerous design risk. "
        "All three personas want it — but they need it to do fundamentally different things. "
        "Yael needs live, intimate, minimally structured capture. Marit needs an auditable, standardised, institutional record. "
        "Daan needs it to double as a governance document that bridges shadow AI work to organisational recognition. "
        "A two-layer design (private process / public artefact) is the most viable architecture, "
        "but it requires deliberate facilitation culture to prevent collapse toward whichever version "
        "produces the most visible artefacts in any given cohort.",
        ST["body"]
    ))
    story.append(sp(8))

    story.append(Paragraph("Likely Decision", ST["h3"]))
    story.append(Paragraph(
        "Implement the two-layer Override Log, build a three-question entry diagnostic routing participants to differentiated tracks, "
        "and redesign the Transformation Expo to include an organisational adoption conversation. "
        "These three changes are the only ones all three personas can agree on — and they extend the program's range without a fundamental redesign.",
        ST["body"]
    ))
    story.append(sp(6))

    story.append(rule(w))
    story.append(sp(4))


# ── Per-persona summaries ────────────────────────────────────────
def build_persona(story, w, name, colour, role, baseline, identity_from, identity_to,
                  r1_vote, r1_cond, r2_vote, r2_note, improvements, risks, premortem_summary):

    story.append(PageBreak())
    story.append(section_header_block(f"Persona — {name}", name, w))
    story.append(sp(2))

    # Persona meta table
    meta_rows = [
        [Paragraph("ROLE", ST["meta_label"]),
         Paragraph("EMOTIONAL BASELINE", ST["meta_label"]),
         Paragraph("IDENTITY TRANSITION", ST["meta_label"])],
        [Paragraph(role, ST["caption"]),
         Paragraph(baseline, ST["caption"]),
         Paragraph(f"{identity_from}  →  {identity_to}", ST["caption"])],
    ]
    meta_tbl = Table(meta_rows, colWidths=[w*0.32, w*0.34, w*0.34])
    meta_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), LIGHT_GRAY),
        ("BACKGROUND",    (0,1), (-1,-1), colors.white),
        ("GRID",          (0,0), (-1,-1), 0.4, MID_GRAY),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 6),
        ("RIGHTPADDING",  (0,0), (-1,-1), 6),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
        ("LINEBELOW",     (0,0), (-1,0), 0.5, colour),
    ]))
    story.append(meta_tbl)
    story.append(sp(8))

    # Vote row
    v1_text, v1_c, v1_bg = vote_badge(r1_vote)
    v2_text, v2_c, v2_bg = vote_badge(r2_vote)
    vote_rows = [
        [Paragraph("ROUND 1 VOTE", ST["h4"]),
         Paragraph("CONDITION / NOTE", ST["h4"]),
         Paragraph("ROUND 2 VOTE", ST["h4"]),
         Paragraph("WHAT CHANGED", ST["h4"])],
        [Paragraph(v1_text, ParagraphStyle("vb", fontName="Helvetica-Bold", fontSize=8, textColor=v1_c)),
         Paragraph(r1_cond, ST["caption"]),
         Paragraph(v2_text, ParagraphStyle("vb2", fontName="Helvetica-Bold", fontSize=8, textColor=v2_c)),
         Paragraph(r2_note, ST["caption"])],
    ]
    vtbl = Table(vote_rows, colWidths=[w*0.14, w*0.36, w*0.14, w*0.36], repeatRows=1)
    vtbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), NAVY),
        ("TEXTCOLOR",     (0,0), (-1,0), colors.white),
        ("BACKGROUND",    (0,1), (-1,-1), colors.white),
        ("BOX",           (0,0), (-1,-1), 0.4, MID_GRAY),
        ("INNERGRID",     (0,0), (-1,-1), 0.3, LIGHT_GRAY),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 6),
        ("RIGHTPADDING",  (0,0), (-1,-1), 6),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
        ("BACKGROUND",    (0,1), (0,1), v1_bg),
        ("BACKGROUND",    (2,1), (2,1), v2_bg),
    ]))
    story.append(vtbl)
    story.append(sp(10))

    # Top 3 Improvements
    story.append(Paragraph("Top 3 Improvements", ST["h3"]))
    for i, (title, body) in enumerate(improvements, 1):
        imp_tbl = Table([[
            Paragraph(f"{i}", ParagraphStyle("num", fontName="Helvetica-Bold",
                fontSize=11, textColor=colours_for_num(i), leading=14)),
            [Paragraph(title, ST["body_b"]),
             Paragraph(body, ST["body"])]
        ]], colWidths=[12*mm, w - 12*mm])
        imp_tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 4),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
        ]))
        story.append(imp_tbl)
    story.append(sp(4))
    story.append(rule(w))
    story.append(sp(6))

    # Top 3 Risks
    story.append(Paragraph("Top 3 Risks", ST["h3"]))
    for i, (title, body) in enumerate(risks, 1):
        risk_tbl = Table([[
            ColourBar(3*mm, 14, CORAL),
            [Paragraph(title, ST["body_b"]),
             Paragraph(body, ST["body"])]
        ]], colWidths=[5*mm, w - 5*mm])
        risk_tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
        ]))
        story.append(risk_tbl)
    story.append(sp(4))
    story.append(rule(w))
    story.append(sp(6))

    # Pre-mortem
    story.append(Paragraph("Pre-Mortem Summary", ST["h3"]))
    story.append(Paragraph(premortem_summary, ST["body_i"]))
    story.append(sp(6))


def colours_for_num(i):
    return [CORAL, MIDNIGHT, PURPLE][i-1]


# ── Cross-vote table ─────────────────────────────────────────────
def build_cross_votes(story, w):
    story.append(PageBreak())
    story.append(section_header_block("Round 2", "Cross-Suggestion Votes", w))
    story.append(sp(4))
    story.append(Paragraph(
        "Each persona voted on the other two personas' key improvements. "
        "YES = supports as stated. CONDITIONAL = supports with modification. NO = opposed on behavioral grounds.",
        ST["body"]
    ))
    story.append(sp(6))

    def vb(v):
        if v == "YES":   return Paragraph("YES",  ST["badge_yes"])
        if v == "NO":    return Paragraph("NO",   ST["badge_no"])
        if v == "—":     return Paragraph("—",    ST["caption"])
        return Paragraph("COND", ST["badge_cond"])

    headers = [
        Paragraph("SUGGESTION", ST["h4"]),
        Paragraph("FROM", ST["h4"]),
        Paragraph("MARIT", ST["h4"]),
        Paragraph("YAEL", ST["h4"]),
        Paragraph("DAAN", ST["h4"]),
    ]
    rows = [headers] + [
        [Paragraph(s, ST["caption"]), Paragraph(src, ST["caption_b"]), vb(m), vb(y), vb(d)]
        for s, src, m, y, d in [
            ("Governance layer in Override Log (decision type, downstream risk)",
             "Marit", "—", "CONDITIONAL", "YES"),
            ("Sprint methodology card (hypothesis, input, output, decision, rationale)",
             "Marit", "—", "CONDITIONAL", "NO"),
            ("Defensibility Audit rotation in Transformation Expo",
             "Marit", "—", "NO", "YES"),
            ("Override Log as live capture tool (voice memo / micro-annotation)",
             "Yael", "CONDITIONAL", "—", "YES"),
            ("Craft critique layer added to Sprint",
             "Yael", "CONDITIONAL", "—", "CONDITIONAL"),
            ("Override Log split into private process + public artefact",
             "Yael", "YES", "—", "CONDITIONAL"),
            ("Advanced Track with differentiated entry diagnostic",
             "Daan", "YES", "CONDITIONAL", "—"),
            ("Institutional translation field in Override Log",
             "Daan", "YES", "CONDITIONAL", "—"),
            ("Shadow work prompt in Reflection Pods",
             "Daan", "NO", "YES", "—"),
        ]
    ]

    col_w = [w*0.42, w*0.12, w*0.14, w*0.14, w*0.14]
    tbl = Table(rows, colWidths=col_w, repeatRows=1)
    tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), NAVY),
        ("TEXTCOLOR",     (0,0), (-1,0), colors.white),
        ("ROWBACKGROUNDS",(0,1), (-1,-1), [colors.white, LIGHT_GRAY]),
        ("GRID",          (0,0), (-1,-1), 0.3, MID_GRAY),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 5),
        ("RIGHTPADDING",  (0,0), (-1,-1), 5),
        ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
        ("ALIGN",         (2,0), (-1,-1), "CENTER"),
    ]))
    story.append(tbl)
    story.append(sp(10))


# ── Tensions & Consensus ─────────────────────────────────────────
def build_tensions_consensus(story, w):
    story.append(PageBreak())
    story.append(section_header_block("Synthesis", "Tensions & Consensus", w))
    story.append(sp(4))

    half = (w - 6*mm) / 2

    story.append(Paragraph("Key Tensions — No Clean Resolution", ST["h3"]))
    tensions = [
        ("Override Log is structurally bifurcated",
         "Yael needs live, intimate, minimally structured. Marit needs auditable, standardised, institutional. "
         "A two-layer design can coexist but the facilitation culture will collapse it toward one or the other over time."),
        ("Differentiated entry vs cohort cohesion",
         "An Advanced Track serves Daan and protects Yael, but splitting by experience risks eliminating "
         "the cross-pollination that makes the Transformation Expo valuable. 80 experiments from a mixed "
         "cohort are richer than 80 from a homogeneous one."),
        ("Speed as signal, quality as undercurrent",
         "\"Minimum viable experiment,\" \"what did you ship\" — the program's energy signals throughput. "
         "Motivating for early-stage participants; alienating for practitioners whose value proposition is quality."),
        ("Institutional recognition vs individual learning",
         "Daan and Marit both need organisationally legible outcomes. Yael needs personally legible craft development. "
         "The program is designed for individual learning. Whether it can also produce institutional recognition "
         "mechanisms is an open design question."),
    ]

    for title, body in tensions:
        t_tbl = Table([[
            ColourBar(2*mm, 16, CORAL),
            [Paragraph(title, ST["body_b"]),
             Paragraph(body, ST["body"])]
        ]], colWidths=[5*mm, w - 5*mm])
        t_tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
        ]))
        story.append(t_tbl)

    story.append(sp(6))
    story.append(rule(w))
    story.append(sp(6))

    story.append(Paragraph("Consensus Points — All Three Agree", ST["h3"]))
    consensuses = [
        ("The Override Log is the most valuable component",
         "All three personas engage with it most deeply and all three have substantive improvements. "
         "It's also the component with the most design risk — it needs to serve too many purposes."),
        ("Tiny Experiment needs a documentation layer",
         "All three want the Tiny Experiment to produce something more durable than a commitment — "
         "a record, a governance brief, an institutional artefact. \"Minimum viable\" undersells what the component could do."),
        ("Deep Dive framing is too generic",
         "\"Greatest workflow challenge\" needs to offer multiple frames: workflow challenge / creative problem / adoption problem."),
        ("Transformation Expo has the most untapped potential",
         "The current scale showcase (80 experiments) is the least interesting version. "
         "Stakeholder communication rehearsal, quality breakthrough showcase, and shadow work visibility all fit within the existing structure."),
    ]

    for title, body in consensuses:
        c_tbl = Table([[
            ColourBar(2*mm, 16, YES_C),
            [Paragraph(title, ST["body_b"]),
             Paragraph(body, ST["body"])]
        ]], colWidths=[5*mm, w - 5*mm])
        c_tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
        ]))
        story.append(c_tbl)


# ── Decision Framework ───────────────────────────────────────────
def build_decisions(story, w):
    story.append(PageBreak())
    story.append(section_header_block("Decision Framework", "Three Design Decisions That Determine Range", w))
    story.append(sp(4))
    story.append(Paragraph(
        "The program as currently designed works well for participants in the early-to-middle range of AI adoption. "
        "It loses participants at both ends. These three binary decisions determine how far the range extends.",
        ST["body"]
    ))
    story.append(sp(6))

    decisions = [
        ("1", "Does the Override Log support live capture?",
         "If yes: expands accessibility for advanced practitioners and craft-focused participants. "
         "Signals that integration is the mode, not retrospective reflection. "
         "Requires a lightweight mobile-first capture interface or voice memo integration.",
         "YES → Serves Yael + Daan, doesn't harm Marit",
         "NO → Program signals reflection over integration; Yael and Daan both disengage"),
        ("2", "Is there a differentiated entry track?",
         "If yes: the program can serve a wider experience range without alienating advanced participants. "
         "Requires a three-question pre-session diagnostic and clear track communication. "
         "Not a separate program — a parallel track within the same sessions.",
         "YES → Daan stays, Yael gets appropriate peers, Marit benefits from pressure release",
         "NO → Program optimises for the median; loses both ends of the experience spectrum by week four"),
        ("3", "Does the program produce institutionally legible outputs?",
         "If yes: operates as both learning experience and professional development portfolio. "
         "Override Log with governance layer, Tiny Experiment with documentation brief, "
         "and Transformation Expo with defensibility rotation all produce artefacts "
         "participants can bring back to their organisations.",
         "YES → Marit and Daan can justify continued participation; Yael's craft becomes legible to clients",
         "NO → Program remains a personal learning initiative — valuable but insufficient for Marit and Daan"),
    ]

    for num, question, body, yes_txt, no_txt in decisions:
        d_rows = [
            [Paragraph(num, ParagraphStyle("dnum", fontName="Helvetica-Bold", fontSize=16,
                textColor=CORAL, leading=18)),
             [Paragraph(question, ST["h3"]),
              Paragraph(body, ST["body"])]],
        ]
        d_tbl = Table(d_rows, colWidths=[10*mm, w - 10*mm])
        d_tbl.setStyle(TableStyle([
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("TOPPADDING",    (0,0), (-1,-1), 0),
            ("BOTTOMPADDING", (0,0), (-1,-1), 0),
            ("LEFTPADDING",   (0,0), (-1,-1), 0),
            ("RIGHTPADDING",  (0,0), (-1,-1), 0),
        ]))
        story.append(d_tbl)

        opt_rows = [[
            Paragraph(f"✓  {yes_txt}", ParagraphStyle("opt_yes",
                fontName="Helvetica", fontSize=8, textColor=YES_C, leading=11)),
            Paragraph(f"✗  {no_txt}", ParagraphStyle("opt_no",
                fontName="Helvetica", fontSize=8, textColor=NO_C, leading=11)),
        ]]
        opt_tbl = Table(opt_rows, colWidths=[w*0.5, w*0.5])
        opt_tbl.setStyle(TableStyle([
            ("BACKGROUND",    (0,0), (0,-1), colors.HexColor("#e8f7ee")),
            ("BACKGROUND",    (1,0), (1,-1), colors.HexColor("#fdecea")),
            ("TOPPADDING",    (0,0), (-1,-1), 5),
            ("BOTTOMPADDING", (0,0), (-1,-1), 5),
            ("LEFTPADDING",   (0,0), (-1,-1), 8),
            ("RIGHTPADDING",  (0,0), (-1,-1), 8),
            ("VALIGN",        (0,0), (-1,-1), "TOP"),
            ("BOX",           (0,0), (-1,-1), 0.3, MID_GRAY),
            ("INNERGRID",     (0,0), (-1,-1), 0.3, MID_GRAY),
        ]))
        story.append(sp(4))
        story.append(opt_tbl)
        story.append(sp(8))

    # Recommended decision callout
    rec_data = [[
        [Paragraph("RECOMMENDED DECISION", ST["meta_label"]),
         sp(3),
         Paragraph(
             "Implement the two-layer Override Log (private process / public document), "
             "build a three-question entry diagnostic routing participants to differentiated tracks, "
             "and redesign the Transformation Expo to include an explicit organisational adoption conversation. "
             "These three changes extend the program's range without requiring a fundamental redesign. "
             "They are the changes all three personas can agree on — even when they cannot agree on much else.",
             ParagraphStyle("rec", fontName="Helvetica", fontSize=9, leading=13.5,
                 textColor=colors.HexColor("#ccccdd"), spaceAfter=0, alignment=TA_JUSTIFY))
        ]
    ]]
    rec_tbl = Table(rec_data, colWidths=[w])
    rec_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), NAVY),
        ("TOPPADDING",    (0,0), (-1,-1), 16),
        ("BOTTOMPADDING", (0,0), (-1,-1), 16),
        ("LEFTPADDING",   (0,0), (-1,-1), 16),
        ("RIGHTPADDING",  (0,0), (-1,-1), 16),
    ]))
    story.append(rec_tbl)


# ── Page number callback ─────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MID_GRAY)
    page_w, page_h = A4
    canvas.drawString(LEFT_M, BOT_M - 5*mm, "SCAMPER Audit · AI Learning Cluster Prototype · 25 March 2026")
    canvas.drawRightString(page_w - RIGHT_M, BOT_M - 5*mm, f"Page {doc.page}")
    canvas.restoreState()


# ── Main build ───────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        OUT_PATH,
        pagesize=A4,
        leftMargin=LEFT_M,
        rightMargin=RIGHT_M,
        topMargin=TOP_M,
        bottomMargin=BOT_M + 8*mm,
        title="SCAMPER Audit — AI Learning Cluster",
        author="Council Method",
    )
    w = A4[0] - LEFT_M - RIGHT_M
    story = []

    build_cover(story, w)
    build_exec_summary(story, w)

    # ── MARIT ──
    build_persona(
        story, w,
        name="Marit",
        colour=MARIT_C,
        role="Senior L&D Advisor · Regulated Multinational (Financial / Pharma / Gov)",
        baseline="Low-grade governance anxiety — continuous, not episodic. Every feature filtered through 'can I defend this in a meeting?'",
        identity_from="Compliant executor",
        identity_to="Responsible innovator",
        r1_vote="CONDITIONAL",
        r1_cond="Needs explicit governance scaffolding and documented defensibility framework",
        r2_vote="CONDITIONAL",
        r2_note="Debate gave her new vocabulary but didn't resolve governance gap. Reasoning deepened, vote unchanged.",
        improvements=[
            ("Governance Scaffolding Layer in the Override Log",
             "Additional field set: decision type (compliance / accuracy / ethical / aesthetic), "
             "context, downstream risk. Converts a reflective tool into a professional artefact that survives scrutiny."),
            ("Sprint Methodology Card",
             "One-page card before hands-on work: hypothesis, input, output, decision, rationale. "
             "Builds the habit of documenting decisions at the moment they're made."),
            ("\"Defensibility Audit\" Rotation at the Transformation Expo",
             "One of the six tables dedicated to: how would you defend this workflow redesign to your "
             "compliance team / audit committee? Reframes the Expo as re-entry preparation."),
        ],
        risks=[
            ("Governance anxiety mechanism: continuous filtering, not episodic resistance",
             "Her threat radar is running constantly. If the program's energy feels incompatible with "
             "that cognitive overhead, she'll attribute the discomfort to the program and conclude it "
             "\"isn't for her\" without ever articulating that what she needed was permission to slow down."),
            ("Comfort-threat mechanism: experimentation with no institutional frame",
             "The program explicitly asks her to experiment — which in her context means doing things "
             "that haven't been approved. Risk: she engages superficially (completes minimum requirements) "
             "while never actually changing behaviour outside sessions."),
            ("Identity threat mechanism: \"reckless\" as the worst professional label",
             "Any moment where she's asked to share unfinished work or demonstrate a failed experiment "
             "becomes a threat to professional identity. She'll polish everything before sharing "
             "and lose the learning the program is designed to produce."),
        ],
        premortem_summary=(
            "Marit made it to week five. First two cycles were fine — guests credible, experiments useful. "
            "But in week five, during a Deep Dive, she was asked to share her \"messy middle\" — "
            "a moment where AI surprised her or she didn't know what to do. She had examples. "
            "But every one involved content tested outside formally approved AI-production processes. "
            "Sharing meant putting work on record in a semi-public space. She froze. "
            "She stopped attending after week six, telling herself she was \"too busy.\" "
            "The real reason: the program offered a space to experiment. "
            "It didn't offer a defensible institutional frame for the experiments. "
            "Those two things are not the same. She needed the second before she could use the first."
        )
    )

    # ── YAEL ──
    build_persona(
        story, w,
        name="Yael",
        colour=YAEL_C,
        role="Independent Learning Designer · Boutique Consultancy · 12+ Years",
        baseline="Deflation, not anger. When the program leads with speed or scale, she experiences not-being-seen.",
        identity_from="Individual craftsperson",
        identity_to="AI-augmented practitioner who can name what's distinctly hers",
        r1_vote="CONDITIONAL",
        r1_cond="Override Log must support live capture; cohort needs prior workflow redesign experience (at least a third)",
        r2_vote="YES",
        r2_note="Daan's reframe — Override Log as craft legitimacy tool AND governance doc — resolved her core friction. Changed.",
        improvements=[
            ("Override Log Redesigned as Live Capture Tool",
             "Voice memo, margin annotation, or lightweight mobile-first input allowing capture in the moment of override. "
             "Three questions remain but answerable in 30 seconds mid-sprint, not 10 minutes post-session. "
             "Retrospective capture is reconstruction, not documentation."),
            ("Structured Craft Critique Layer in the Sprint",
             "After each micro-case: 10 minutes of structured peer critique. "
             "What's the quality signal in this output? What did the AI miss? "
             "What does that correction tell you about your judgment?"),
            ("Override Log Split into Private Process and Public Artefact",
             "Live annotation layer is private — messy, in-progress. "
             "A curatorial step allows participants to select 1-2 entries to make public within the cohort "
             "or as a client-facing transparency document. Respects creative intimacy while enabling visibility."),
        ],
        risks=[
            ("Deflation mechanism: speed/scale framing triggers not-being-seen",
             "Every time the program foregrounds efficiency, she experiences a signal that throughput is valued over quality. "
             "Risk: she attends but disengages emotionally — never brings the work that matters to her "
             "because she doesn't believe this is a space that can see it."),
            ("Identity threat mechanism: AI as the source of capability",
             "If the program consistently frames AI as what makes this possible, it positions AI as the agent "
             "and participants as beneficiaries. Her professional identity is built on being the source of capability. "
             "Risk: she starts describing her process in AI terms rather than craft terms. That's an identity loss, not a skill gain."),
            ("Community mismatch mechanism: cohort at the wrong level",
             "If the cohort is primarily early-stage AI users, every session becomes implicit remediation. "
             "The craft conversation she needs requires peers already past the 'AI is interesting' stage. "
             "Without them, she's the most advanced person in the room — lonely in a different way from Daan."),
        ],
        premortem_summary=(
            "Yael lasted seven weeks. First three were promising — a Show & Tell guest demonstrated research synthesis "
            "she hadn't seen before, and the Override Log gave her language for something she'd been doing intuitively. "
            "Then week four happened. During the Sprint debrief, the facilitator said 'look how fast we can produce this' "
            "and the room lit up comparing output times. She'd been going slower on purpose — pausing, interrogating "
            "word choices, rewriting structure that was technically correct and creatively inert. "
            "She raised this in the debrief. Her comment landed as 'Yael has different needs.' "
            "She stopped coming after week seven. Told her contact 'the timing didn't work.' "
            "It was easier than explaining she needed a room full of Daans, not a room full of Marits."
        )
    )

    # ── DAAN ──
    build_persona(
        story, w,
        name="Daan",
        colour=DAAN_C,
        role="L&D Manager · Mid-Large Org · 18 Months of Shadow AI Work on Personal Devices",
        baseline="Productive frustration layered with loneliness. Pride in what he's built; acute awareness none of it counts yet.",
        identity_from="Content producer → workflow designer",
        identity_to="Organisational change agent",
        r1_vote="CONDITIONAL",
        r1_cond="Entry point must acknowledge prior work; program must not position itself as onboarding for beginners",
        r2_vote="CONDITIONAL",
        r2_note="Condition sharpened: needs concrete org adoption pathway, not just an Advanced Track. Vote unchanged, precision increased.",
        improvements=[
            ("Advanced Track with Differentiated Entry Point",
             "Not a separate program — a parallel track within the same sessions, pitched at organisational integration "
             "and adoption problems, not AI tool use. Requires a three-question pre-session diagnostic. "
             "Without this, the most experienced participants leave by week three."),
            ("Institutional Translation Field in the Override Log",
             "One additional field: 'What would I need to write for my director to trust this decision?' "
             "The Override Log becomes both a personal record and a stakeholder communication tool. "
             "The difference between the program being useful and merely interesting."),
            ("Shadow Work Prompt in the Reflection Pods",
             "Add: what are you working on that you can't show officially? What would it take to make it visible? "
             "Opens the conversation advanced practitioners need — about the gap between private capability "
             "and organisational recognition. Pods extended to 30 minutes every two cycles."),
        ],
        risks=[
            ("Entry-level design mechanism: designed for someone who hasn't started yet",
             "Every Show & Tell demonstrating a basic AI use case, every Sprint starting from scratch, "
             "every Tiny Experiment framed as 'minimum viable' signals the program is for the beginning of the journey. "
             "The dissonance will accumulate. By week three he'll feel like he's in a masterclass he already knows."),
            ("Cognitive dependency anxiety mechanism: accelerating the problem",
             "He's aware of his AI dependency ('een soort verslaving'). The program asks him to do more of exactly "
             "what he's concerned about. Risk: he over-engages, builds more shadow work during the program, "
             "and emerges with more unofficial capability and no better path to recognition."),
            ("Isolation mechanism: nobody at the same level",
             "If the cohort is primarily Marits and Yaels, he'll end up in an implicit teaching role he didn't sign up for. "
             "Performing generosity while experiencing loneliness. He's been doing this alone for 18 months. "
             "He doesn't need to do it alone in a group setting."),
        ],
        premortem_summary=(
            "Daan stayed for six weeks, longer than he expected. Session one was good — a Show & Tell guest "
            "framed automated pipeline design at workflow level, not task level. Bought him three more sessions. "
            "But by week four it was clear: the Sprint was aimed at people learning what prompting felt like. "
            "He was sitting with multi-step AI workflows he couldn't bring because they involved systems "
            "built outside official channels that the program had no framework for discussing. "
            "He raised it in a Reflection Pod. His pod partner looked alarmed — not at what he'd built, "
            "but that he'd built it without approval. He left after week six. Not angry. "
            "Just disappointed in a specific way: the loneliness he'd been carrying didn't get lighter. "
            "It got heavier, because he'd allowed himself to think this time might be different."
        )
    )

    build_cross_votes(story, w)
    build_tensions_consensus(story, w)
    build_decisions(story, w)

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f"PDF written to: {OUT_PATH}")


if __name__ == "__main__":
    build()
