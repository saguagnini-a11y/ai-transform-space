from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# COLOURS
NAVY    = colors.HexColor('#1a1a2e')
CORAL   = colors.HexColor('#e94560')
WARM    = colors.HexColor('#f5f5f0')
DKBLUE  = colors.HexColor('#16213e')
MARIT_C = colors.HexColor('#4a90d9')
YAEL_C  = colors.HexColor('#e8a838')
DAAN_C  = colors.HexColor('#5bb85b')
YES_C   = colors.HexColor('#2d7a2d')
NO_C    = colors.HexColor('#c0392b')
COND_C  = colors.HexColor('#d68910')
LIGHT   = colors.HexColor('#555555')
BORDER  = colors.HexColor('#e0e0da')

W, H = A4

doc = SimpleDocTemplate(
    '/Users/saraguagnini/ai-transform-space/scamper-audit-2026-03-26/scamper-audit-print.pdf',
    pagesize=A4,
    leftMargin=2*cm, rightMargin=2*cm,
    topMargin=2.2*cm, bottomMargin=2.2*cm,
    title='SCAMPER Audit — AI Learning Cluster',
    author='AI Transform Space'
)

# --- STYLES ---
base = getSampleStyleSheet()

def S(name, **kw):
    s = ParagraphStyle(name, **kw)
    return s

LABEL = S('label', fontName='Helvetica-Bold', fontSize=8, textColor=CORAL,
          spaceAfter=4, spaceBefore=0, leading=10,
          wordWrap='LTR')
H1 = S('h1', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY,
        spaceAfter=6, spaceBefore=0, leading=26)
H2 = S('h2', fontName='Helvetica-Bold', fontSize=15, textColor=NAVY,
        spaceAfter=4, spaceBefore=14, leading=19)
H3 = S('h3', fontName='Helvetica-Bold', fontSize=12, textColor=NAVY,
        spaceAfter=3, spaceBefore=10, leading=15)
BODY = S('body', fontName='Helvetica', fontSize=9.5, textColor=colors.HexColor('#222222'),
         spaceAfter=5, leading=14)
BODY_SM = S('bodysm', fontName='Helvetica', fontSize=8.5, textColor=LIGHT,
            spaceAfter=4, leading=12)
BOLD_SM = S('boldsm', fontName='Helvetica-Bold', fontSize=9, textColor=NAVY,
            spaceAfter=3, leading=13)
ITALIC = S('italic', fontName='Helvetica-Oblique', fontSize=9, textColor=LIGHT,
           spaceAfter=5, leading=13)
QUOTE = S('quote', fontName='Helvetica-Oblique', fontSize=9, textColor=colors.HexColor('#444'),
          spaceAfter=4, leading=13, leftIndent=10)
SMALL = S('small', fontName='Helvetica', fontSize=8, textColor=LIGHT,
          spaceAfter=3, leading=11)

def hr(color=BORDER, thickness=0.5):
    return HRFlowable(width='100%', thickness=thickness, color=color, spaceAfter=8, spaceBefore=4)

def section_header(label_text, title_text):
    return [
        Paragraph(label_text.upper(), LABEL),
        Paragraph(title_text, H1),
        hr(CORAL, 1.5),
        Spacer(1, 6),
    ]

def h2(t): return Paragraph(t, H2)
def h3(t): return Paragraph(t, H3)
def body(t): return Paragraph(t, BODY)
def sm(t): return Paragraph(t, BODY_SM)
def bold(t): return Paragraph(t, BOLD_SM)
def italic(t): return Paragraph(t, ITALIC)
def quote(t): return Paragraph(f'"{t}"', QUOTE)
def sp(n=6): return Spacer(1, n)

def vote_badge(v):
    v = v.strip().upper()
    if v == 'YES': return ('YES', YES_C)
    if v == 'NO': return ('NO', NO_C)
    return ('COND', COND_C)

# ============================================================
story = []

# ---- COVER PAGE ----
story += [
    Spacer(1, 1.5*cm),
    Paragraph('SCAMPER AUDIT', S('covlabel', fontName='Helvetica-Bold', fontSize=10,
                                  textColor=CORAL, leading=13, spaceAfter=8)),
    Paragraph('AI Learning Cluster Prototype', S('covtitle', fontName='Helvetica-Bold',
               fontSize=30, textColor=NAVY, leading=36, spaceAfter=12)),
    hr(CORAL, 2),
    Spacer(1, 6),
    Paragraph('26 March 2026  ·  3 Personas  ·  4 Components  ·  ai-transform-space.lovable.app',
              S('covmeta', fontName='Helvetica', fontSize=9, textColor=LIGHT, leading=13, spaceAfter=20)),
    Spacer(1, 0.8*cm),
]

# ---- EXECUTIVE SUMMARY ----
story += section_header('Executive Summary', 'Final Votes & Key Findings')

# Final votes table
vote_data = [
    ['Persona', 'Round 1', 'Round 2', 'Changed?', 'Condition / Reason'],
    ['Marit', 'CONDITIONAL', 'CONDITIONAL', 'No',
     'Constraint environment track + Validated Application template + Override Log stakeholder prompt'],
    ['Yael', 'CONDITIONAL', 'CONDITIONAL', 'No',
     'Override Log live (in-the-moment) + Sprint annotation step + Reflection Pods anchor changed'],
    ['Daan', 'NO', 'CONDITIONAL', 'YES',
     'Constraint/depth track framing by Marit & Yael suggested a viable architecture'],
]

ts = TableStyle([
    ('BACKGROUND', (0,0), (-1,0), NAVY),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,0), 8),
    ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,1), (-1,-1), 8),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8f8f5')]),
    ('GRID', (0,0), (-1,-1), 0.4, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('LEFTPADDING', (0,0), (-1,-1), 7),
    # Highlight changed row
    ('TEXTCOLOR', (3,3), (3,3), YES_C),
    ('FONTNAME', (3,3), (3,3), 'Helvetica-Bold'),
])
t = Table(vote_data, colWidths=[2.5*cm, 2.2*cm, 2.2*cm, 1.8*cm, None])
t.setStyle(ts)
story += [t, sp(10)]

story += [
    bold('Sharpest Insight'),
    body('The Override Log is being asked to serve three incompatible purposes simultaneously: '
         'Yael\'s craft portfolio, Marit\'s stakeholder record, and Daan\'s governance document. '
         'These require different prompts and produce different outputs. The program needs to '
         'decide which it optimizes for — or offer structurally differentiated versions. '
         'This is not a polish problem. It is a design decision about the program\'s primary beneficiary.'),
    sp(8),
    bold('Likely First Priority'),
    body('Change the Reflection Pod anchor question from "show the artifact (prompt + output)" '
         'to "show the moment you overrode AI." This is the only suggestion in the audit that '
         'all three personas either proposed independently or voted YES on. Zero structural cost. '
         'Implement before the next cycle.'),
    sp(8),
    bold('What Can Wait'),
    body('Capability/constraint/depth tracks in the Deep Dive. All three personas agree tracks '
         'are needed; they disagree on what organizes them. Pilot one alternative format in a '
         'single session before committing to a structural redesign.'),
]

story += [hr(), sp(4)]

# ---- PERSONA SUMMARIES ----
story += section_header('Round 1', 'Per-Persona Summaries')

personas = [
    {
        'name': 'Marit',
        'color': '#4a90d9',
        'role': 'Senior L&D Advisor, regulated multinational',
        'baseline': 'Low-grade governance anxiety. Continuous, not episodic.',
        'transition': 'Compliant executor → responsible innovator',
        'vote1': 'CONDITIONAL', 'vote2': 'CONDITIONAL', 'changed': 'No',
        'trigger': "I'd probably read it carefully, save the link, and never come back.",
        'improvements': [
            'Add a "Constraint Environment Declaration" at cycle start — adaptive scaffolding by track (regulated / semi-regulated / open). Different Sprint scaffolding and Tiny Experiment defaults per track.',
            'Rename Tiny Experiment → "Validated Application" with optional documentation template (use case, tool used, reviewed by, status). Same behavior — institutional language that survives a manager question.',
            'Add a 4th Override Log prompt: "What would I tell a stakeholder who asked about this decision?" Converts private reflection into draft institutional communication.',
        ],
        'risks': [
            "Sprint's 'no theory, just experiment' framing triggers governance anxiety (mechanism: anxiety). Participants will either withdraw mentally or perform safe, trivial tasks.",
            'Peer sharing before trust is built (mechanism: comfort). One unconstrained comment — "just try it!" — confirms this room is not safe. Marit will not return.',
            'No institutional bridge from program to organization (mechanism: identity threat). The transformation from "compliant executor" to "responsible innovator" has no organizational path.',
        ],
        'premortem': (
            'Week 2 Sprint: built something trivial to avoid exposure. '
            'Pod comment — "just use live data" — felt dangerous. '
            'Week 4: experiment wall showed mine as "pending." '
            'Felt visible in the wrong way. Did not come back. '
            'The program had no legitimate path through my constraints.'
        ),
    },
    {
        'name': 'Yael',
        'color': '#e8a838',
        'role': 'Independent learning designer, boutique consultancy, 12 years',
        'baseline': 'Deflation layered with identity vigilance. Scanning for whether this space sees her.',
        'transition': 'Individual craftsperson → AI-augmented practitioner who can name what\'s distinctly hers',
        'vote1': 'CONDITIONAL', 'vote2': 'CONDITIONAL', 'changed': 'No',
        'trigger': "I was already doing things people hadn't done before. That's what craft is.",
        'improvements': [
            'Add mid-Sprint decision annotation pause (15 min in): participants stop and narrate choices made so far. Craft visibility in real time, not retrospective.',
            'Two additional Override Log prompts: "What did you try before you reached this override?" and "What would a less experienced practitioner have done here?" — where craft differentiation lives.',
            'Change Reflection Pods anchor from "show the artifact (prompt + output)" to "show the moment you overrode AI." Process, not product.',
        ],
        'risks': [
            "Output celebration (mechanism: deflation). '80 experiments completed' measures quantity of AI use. Not quality. Not judgment. Signals the program values productivity, which deflates the craft practitioners it needs most.",
            'Beginner framing in the Sprint (mechanism: identity threat). "No theory — just experimentation" positions participants as novices discovering AI. Yael is deciding where AI earns a place in a 12-year practice.',
            'Retrospective reflection produces performance, not record (mechanism: comfort). If the Override Log is filled out after the session, the authentic decision is already reconstructed into a polished account that doesn\'t capture what happened.',
        ],
        'premortem': (
            'Week 2 Sprint debrief: 15 minutes of outputs. Nobody asked who decided anything. '
            '"This worked well" × 8. '
            'Week 3: posted a genuine override with real stakes from a client project. '
            'Response: "Great use of AI!" They read the artifact, not the decision. '
            'Closed the platform. Not angrily — with deflation. '
            'This program sees outputs. It doesn\'t see practitioners.'
        ),
    },
    {
        'name': 'Daan',
        'color': '#5bb85b',
        'role': 'L&D Manager, 18 months of solo AI building',
        'baseline': 'Productive frustration layered with loneliness. Pride in built work. None of it counts yet.',
        'transition': 'Content producer → workflow designer → organisational change agent',
        'vote1': 'NO', 'vote2': 'CONDITIONAL', 'changed': 'YES — changed',
        'trigger': "I've been doing this alone for a year and a half. The promise of a studio feels like it's for someone who hasn't started yet.",
        'improvements': [
            'Add a systems-level capability track to Deep Dives — peer architecture review format: bring a workflow system, receive structured critique (technical soundness, adoption readiness, scalability).',
            'Reframe Tiny Experiment as "Legitimacy Track" — each cycle, document one piece of shadow work with a path to institutional approval (what was built, blocker, what needs to change).',
            'Turn Transformation Expo into a peer validation event — participants arrive with a submitted use case, receive structured peer feedback, leave with language to take to a director.',
        ],
        'risks': [
            'Capability ceiling (mechanism: identity threat). Program designed for the median participant means anyone building for 18+ months hits the ceiling in week 2 and disengages.',
            'Community promise without capability filtering (mechanism: loneliness). Random pod pairing delivers people 2 years behind. One "what is a prompt?" and the promise of peers is broken again.',
            'Cognitive dependency without deliberate practice (mechanism: Daan\'s own anxiety). All-AI-assisted learning without independent thinking threads reinforces dependency. He\'ll leave more dependent, not more capable.',
        ],
        'premortem': (
            'Week 1: Show & Tell challenge was content format selection with AI. '
            'Automated this decision layer. Sat calculating how long ago he\'d passed this. '
            'Week 2 Sprint: built in 8 minutes. Spent 37 deciding whether to say anything. '
            'Pod: explained his pipeline. They were impressed. Felt worse, not better. '
            'Closed the program. Had been alone 18 months. The room was for people who were starting.'
        ),
    },
]

for p in personas:
    story += [
        KeepTogether([
            Paragraph(f'<font color="{p["color"]}">■</font>  {p["name"]}', H2),
            italic(p['role']),
        ]),
        sp(4),
    ]

    # Info table
    info_data = [
        ['Emotional Baseline', p['baseline']],
        ['Identity Transition', p['transition']],
        ['Round 1 Vote', p['vote1']],
        ['Round 2 Vote', f'{p["vote2"]}  (Changed: {p["changed"]})'],
    ]
    it = Table(info_data, colWidths=[3.5*cm, None])
    it.setStyle(TableStyle([
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('TEXTCOLOR', (0,0), (0,-1), LIGHT),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.white, colors.HexColor('#fafaf8')]),
        ('LINEBELOW', (0,0), (-1,-2), 0.3, BORDER),
    ]))
    story += [it, sp(8)]

    story += [bold('Trigger Quote'), quote(p['trigger']), sp(4)]

    story += [bold('3 Key Improvements')]
    for i, imp in enumerate(p['improvements'], 1):
        story += [body(f'<b>{i}.</b>  {imp}')]
    story += [sp(4)]

    story += [bold('3 Risks')]
    for i, risk in enumerate(p['risks'], 1):
        story += [body(f'<b>{i}.</b>  {risk}')]
    story += [sp(4)]

    story += [bold('Pre-mortem (condensed)'), body(p['premortem']), sp(6)]
    story += [hr(), sp(4)]

# ---- ROUND 2 ----
story += section_header('Round 2', 'Cross-Suggestion Votes')

xvote_data = [
    ['Suggestion', 'Source', 'Marit', 'Yael', 'Daan'],
    ['Constraint environment declaration', 'Marit', '—', 'NO', 'NO'],
    ['"Validated Application" rename', 'Marit', '—', 'NO', 'NO'],
    ['Override Log: stakeholder prompt', 'Marit', '—', 'COND', 'YES'],
    ['Mid-Sprint annotation pause', 'Yael', 'COND', '—', 'COND'],
    ['Two additional Override Log prompts', 'Yael', 'YES', '—', 'COND'],
    ['Pods anchor: "show override moment"', 'Yael', 'COND', '—', 'YES'],
    ['Capability/constraint track Deep Dives', 'Daan', 'YES*', 'COND', '—'],
    ['Tiny Experiment → Legitimacy Track', 'Daan', 'YES', 'NO', '—'],
    ['Expo as peer validation', 'Daan', 'COND', 'COND', '—'],
]

def vote_color(v):
    v = v.strip().upper()
    if v == 'YES' or v == 'YES*': return YES_C
    if v == 'NO': return NO_C
    if v == 'COND': return COND_C
    return LIGHT

xts = TableStyle([
    ('BACKGROUND', (0,0), (-1,0), NAVY),
    ('TEXTCOLOR', (0,0), (-1,0), colors.white),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,0), 8),
    ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE', (0,1), (-1,-1), 8),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8f8f5')]),
    ('GRID', (0,0), (-1,-1), 0.4, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ('LEFTPADDING', (0,0), (-1,-1), 6),
])

# Color vote cells
for row_idx in range(1, len(xvote_data)):
    for col_idx in [2, 3, 4]:
        v = xvote_data[row_idx][col_idx]
        c = vote_color(v)
        if v != '—':
            xts.add('TEXTCOLOR', (col_idx, row_idx), (col_idx, row_idx), c)
            xts.add('FONTNAME', (col_idx, row_idx), (col_idx, row_idx), 'Helvetica-Bold')

xt = Table(xvote_data, colWidths=[5.5*cm, 1.8*cm, 1.8*cm, 1.8*cm, 1.8*cm])
xt.setStyle(xts)
story += [xt, sp(4), sm('*Marit votes YES but reframes as "constraint environment tracks," not capability tracks.'), sp(10)]

# Alliance map
story += [h2('Alliance Map'), sp(4)]

alliances = [
    ('Marit ↔ Daan', '#4a90d9',
     'Aligned on Override Log as governance/legitimization document. Both need institutional bridge. '
     'Disagree: Marit wants constraint environment foregrounded; Daan sees this as self-limiting.'),
    ('Marit ↔ Yael', '#e8a838',
     'Partial alignment: both want Override Log to produce something beyond the session. '
     'Irreconcilable: language adaptation vs. language resistance. No clean resolution.'),
    ('Yael ↔ Daan', '#5bb85b',
     'Strongest agreement: change Reflection Pods anchor from "show the artifact" to "show the override moment." '
     'Deep contention: Override Log purpose — craft portfolio vs. governance document. '
     'Same structure, incompatible purposes.'),
]
for pair, c, text in alliances:
    story += [
        Paragraph(f'<font color="{c}"><b>{pair}</b></font>', BOLD_SM),
        body(text), sp(4),
    ]

story += [hr(), sp(4)]

# ---- TENSIONS ----
story += section_header('Design Tensions', 'No Clean Resolution')

tensions = [
    ('Language adaptation vs. language resistance',
     'Marit: adapt the program\'s language to survive institutional contexts. '
     'Yael: resist — adapting to bureaucratic mediocrity reproduces it. '
     'The program cannot simultaneously signal "experiment freely" and "here is institutional scaffolding." '
     'It must choose which participants it is primarily designing for.'),
    ('Override Log purpose: craft portfolio vs. governance document vs. legitimization tool',
     'Yael: career document, evidence of professional judgment. '
     'Daan: organizational adoption evidence. '
     'Marit: stakeholder-facing record. '
     'Each purpose implies different prompts, different outputs, different uses. '
     'Adding all three creates incoherence or requires three structurally separate versions.'),
    ('Who is this program for?',
     'The core arc (discover → experiment → reflect → iterate) assumes a linear progression through new capability. '
     'Daan is past that arc. Marit is blocked from entering it. Yael is on a different arc entirely. '
     'The program cannot be identical for all three without redesigning its progression model.'),
    ('Community promise vs. capability reality',
     'The program promises peer community. '
     'Heterogeneous room frustrates Daan; filtering for capability creates hierarchy. '
     'No current mechanism resolves this. The program must either accept the trade-off or make it visible.'),
]
for title, body_text in tensions:
    story += [
        Paragraph(f'<b>{title}</b>', S('th', fontName='Helvetica-Bold', fontSize=10,
                                        textColor=CORAL, spaceAfter=3, leading=13)),
        body(body_text), sp(6),
    ]

story += [hr(), sp(4)]

# ---- CONSENSUS ----
story += section_header('High-Confidence Signals', 'Consensus Points')

consensus = [
    ('Change the Reflection Pods anchor to "show the moment you overrode AI."',
     'All three personas either proposed this or voted YES. Highest-confidence single design change. Zero cost to implement.'),
    ('The Override Log is the program\'s strongest component and is under-built.',
     'All three personas engage with it centrally and all three want it to produce something beyond the session. Invest here first.'),
    ('The Tiny Experiment commitment structure does not fit all participant types.',
     'All three personas have a different relationship to the commitment. Some form of differentiated structure is a high-confidence design signal.'),
    ('Shift metrics from quantity to depth.',
     '"80 experiments completed" signals quantity. All three personas are oriented around quality of judgment, depth of redesign, or institutional impact. Change or remove this metric.'),
]
for title, body_text in consensus:
    story += [
        Paragraph(f'<b>{title}</b>', BOLD_SM),
        sm(body_text), sp(6),
    ]

story += [hr(), sp(4)]

# ---- DECISION FRAMEWORK ----
story += section_header('Decision Framework', 'How to Weigh Competing Priorities')

framework = [
    ('1.  Does this change serve the Override Log?',
     'The Override Log is the pedagogical spine and the component all three personas engage with most deeply. Prioritize changes here above changes to other components.'),
    ('2.  Does this change shift Reflection Pods from output-sharing to process-sharing?',
     'The Pod anchor change is the highest-consensus suggestion. Implement first, test immediately.'),
    ('3.  Does this change require deciding who the program is primarily for?',
     'Constraint tracks, capability tracks, and depth tracks are structurally compatible but serve different organizing principles. Decide the organizing principle before implementing any of them.'),
    ('4.  Does this change require differentiating the Tiny Experiment?',
     'Legitimacy Track, Validated Application, and question-commitment are compatible as optional variants. Decide default vs. optional before building.'),
    ('5.  Is this change reversible?',
     'Changes to framing and language are low-cost and reversible — test first. Structural changes (tracks, sprint format, expo redesign) require more commitment. Pilot before building in.'),
]
for title, body_text in framework:
    story += [
        Paragraph(f'<b>{title}</b>', BOLD_SM),
        sm(body_text), sp(6),
    ]

# ---- FOOTER SPACER ----
story += [Spacer(1, 1*cm)]

# Build PDF
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(CORAL)
    canvas.setLineWidth(1.5)
    canvas.line(2*cm, H - 1.2*cm, W - 2*cm, H - 1.2*cm)
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(LIGHT)
    canvas.drawString(2*cm, 1.3*cm, 'SCAMPER Audit — AI Learning Cluster  ·  26 March 2026')
    canvas.drawRightString(W - 2*cm, 1.3*cm, f'Page {doc.page}')
    canvas.restoreState()

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print("PDF generated successfully.")
