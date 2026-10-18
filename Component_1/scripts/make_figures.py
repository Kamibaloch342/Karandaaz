"""Figures for Component 1 (Diagnostic, Curriculum Design and Capacity Building)."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

OUT = os.path.join(os.path.dirname(__file__), "..", "figures")
plt.rcParams.update({"font.family": "Carlito", "font.size": 10})

NAVY, TEAL, ORANGE, GREEN = "#0F4761", "#156082", "#E97132", "#196B24"
LIGHT = {"navy": "#DCE6F0", "teal": "#D9EEF5", "orange": "#FBE5D6", "green": "#E2F0D9", "grey": "#F2F2F2"}


def box(ax, x, y, w, h, text, fc, ec, color="black", size=10, bold=False, r=0.02):
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h, boxstyle=f"round,pad=0,rounding_size={r}",
                                fc=fc, ec=ec, lw=1.2))
    ax.text(x, y, text, ha="center", va="center", fontsize=size, color=color,
            fontweight="bold" if bold else "normal", linespacing=1.15)


def line(ax, x1, y1, x2, y2, color="#7F7F7F"):
    ax.plot([x1, x1, x2, x2], [y1, (y1 + y2) / 2, (y1 + y2) / 2, y2], color=color, lw=1.1, zorder=0)


def arrow(ax, x1, y1, x2, y2, color="#595959"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle="-|>", mutation_scale=12, color=color, lw=1.2))


def fgd_frame():
    fig, ax = plt.subplots(figsize=(10, 5.4))
    ax.set_xlim(0, 16); ax.set_ylim(0, 9); ax.axis("off")
    box(ax, 8, 8.3, 8.2, 0.8, "Rapid baseline assessment: FGD sampling frame", NAVY, NAVY, "white", 12, True)
    provinces = [("Punjab", ["North", "Central", "South"]), ("Khyber Pakhtunkhwa", ["North", "South"]),
                 ("Sindh", ["Upper", "Lower"]), ("Balochistan", ["Quetta"])]
    zx = [1, 3, 5, 7, 9, 11, 13, 15]
    i = 0
    for name, zones in provinces:
        xs = zx[i:i + len(zones)]
        px = sum(xs) / len(xs)
        line(ax, 8, 7.9, px, 7.05)
        box(ax, px, 6.7, max(1.8, 2 * len(zones) - 0.3), 0.7, name, TEAL, TEAL, "white", 11, True)
        for z, x in zip(zones, xs):
            line(ax, px, 6.35, x, 5.65)
            box(ax, x, 5.3, 1.75, 0.7, f"{z} zone" if z != "Quetta" else "Quetta", LIGHT["teal"], TEAL, size=10, bold=True)
            line(ax, x, 4.95, x, 4.35)
            box(ax, x, 4.0, 1.75, 0.7, "1 district" if z != "Quetta" else "Quetta district", LIGHT["navy"], NAVY, size=9.5)
            line(ax, x, 3.65, x - 0.45, 3.05); line(ax, x, 3.65, x + 0.45, 3.05)
            box(ax, x - 0.45, 2.6, 0.82, 0.9, "Urban\ntehsil", "#FDE9E7", "#C0392B", size=8.5)
            box(ax, x + 0.45, 2.6, 0.82, 0.9, "Rural\ntehsil", "#FFF5CC", "#B7950B", size=8.5)
        i += len(zones)
    ax.text(8, 1.55, "Per tehsil: 2 FGDs with beneficiary women (below and above 45 years) · 1 FGD with men of beneficiary households · "
            "2 KIIs (BISP tehsil office, retail agent)", ha="center", fontsize=9.5, color="#404040")
    stats = [("4", "provinces"), ("8", "zones"), ("8", "districts"), ("16", "tehsils"), ("48", "FGDs"), ("32", "KIIs")]
    for k, (n, lab) in enumerate(stats):
        x = 2.25 + k * 2.3
        box(ax, x, 0.6, 2.0, 0.75, "", LIGHT["orange"], ORANGE)
        ax.text(x - 0.35, 0.6, n, ha="right", va="center", fontsize=15, fontweight="bold", color=ORANGE)
        ax.text(x - 0.25, 0.6, lab, ha="left", va="center", fontsize=10.5)
    fig.savefig(os.path.join(OUT, "fig_fgd_sampling_frame.png"), dpi=220, bbox_inches="tight")
    plt.close(fig)


def journey():
    fig, ax = plt.subplots(figsize=(11, 4.6))
    ax.set_xlim(0, 22.4); ax.set_ylim(1.6, 9); ax.axis("off")
    for x0, x1, lab in [(0.2, 10.4, "Month 1 · Readiness sub-phase"), (10.6, 22.2, "Month 2 · Capability sub-phase")]:
        ax.add_patch(FancyBboxPatch((x0, 7.6), x1 - x0, 0.9, boxstyle="round,pad=0,rounding_size=0.1", fc=NAVY, ec=NAVY))
        ax.text((x0 + x1) / 2, 8.05, lab, ha="center", va="center", color="white", fontsize=11.5, fontweight="bold")
    box(ax, 2.2, 5.2, 3.9, 2.8, "Readiness session\n(Day 1, in person)\n\n100% of the cohort\nRegistration on DFLT App\nSIM, PIN, 8171, balance,\nagent rights, complaints",
        LIGHT["navy"], NAVY, size=9)
    box(ax, 7.7, 5.2, 5.0, 2.8, "Four weeks of\ndigital reinforcement\n\nSmartphone: WhatsApp videos\nand messages\nUSSD phone: IVR and SMS\nAll: robocalls + one human call",
        LIGHT["teal"], TEAL, size=9)
    box(ax, 11.85, 5.2, 1.9, 2.8, "Capability\ngate\n\nTrainer\ninference\n+ matrix", LIGHT["orange"], ORANGE, size=9)
    box(ax, 15.7, 6.4, 4.7, 1.55, "Physical capability\nsession (≈70%)\nsimulation, role play, worksheets", LIGHT["green"], GREEN, size=9)
    box(ax, 15.7, 4.0, 4.7, 1.55, "Digital capability\ntrack (≈30%)\ncontent on phone + clinic call", "#EDE4F5", "#6A3D9A", size=9)
    box(ax, 20.35, 5.2, 3.3, 2.8, "Four weeks of\ndigital reinforcement\n(capability content)\n\nThen BISP payment:\nself cash-out", LIGHT["teal"], TEAL, size=9)
    arrow(ax, 4.15, 5.2, 5.2, 5.2); arrow(ax, 10.2, 5.2, 10.9, 5.2)
    arrow(ax, 12.8, 5.7, 13.35, 6.3); arrow(ax, 12.8, 4.7, 13.35, 4.1)
    arrow(ax, 18.05, 6.3, 18.7, 5.7); arrow(ax, 18.05, 4.1, 18.7, 4.7)
    for x, t in [(2.2, "Week 0"), (7.7, "Weeks 1–4"), (11.85, "Week 5"), (20.35, "Weeks 5–8")]:
        ax.text(x, 3.5, t, ha="center", fontsize=8.8, color="#7F7F7F")
    ax.text(11.2, 2.3, "Example: a cohort trained on 1 January returns on 1 February for the capability sub-phase; its reinforcement runs to early March, ahead of the next BISP payment.\n"
            "Each trainer repeats this sequence cohort by cohort, so readiness and capability sessions run side by side from Month 2.", ha="center", va="center", fontsize=9, color="#404040")
    fig.savefig(os.path.join(OUT, "fig_beneficiary_journey.png"), dpi=220, bbox_inches="tight")
    plt.close(fig)


def segmentation():
    fig, ax = plt.subplots(figsize=(10, 6.6))
    ax.set_xlim(0, 20); ax.set_ylim(0, 13.6); ax.axis("off")
    steps = [
        (12.6, "1 · BISP beneficiary list", "Tehsil lists; DFLT I and II graduates flagged by BISP", NAVY),
        (11.2, "2 · Eligibility check (DFLT App)", "Active beneficiary and not already DFLT-trained?", NAVY),
        (9.8, "3 · Mobilisation", "Trainer and BISP tehsil office invite eligible women", NAVY),
        (8.4, "4 · Registration (Readiness Day 1)", "Profile, phone, wallet, literacy and agency", NAVY),
    ]
    for y, t, d, c in steps:
        box(ax, 4.1, y, 7.6, 1.05, "", LIGHT["navy"], c)
        ax.text(0.55, y + 0.2, t, ha="left", va="center", fontsize=10.5, fontweight="bold", color=c)
        ax.text(0.55, y - 0.25, d, ha="left", va="center", fontsize=8.8, color="#404040")
        if y > 8.4:
            arrow(ax, 4.1, y - 0.55, 4.1, y - 0.85)
    # layers
    ax.text(14.2, 12.85, "Segmentation layers", ha="center", fontsize=12, fontweight="bold", color=TEAL)
    box(ax, 14.2, 11.75, 10.6, 1.25, "", LIGHT["teal"], TEAL)
    ax.text(9.15, 12.05, "Layer 1 · Geography", fontsize=10.5, fontweight="bold", color=TEAL, va="center")
    box(ax, 12.9, 11.45, 2.4, 0.55, "Urban tehsil", "#FDE9E7", "#C0392B", size=9)
    box(ax, 15.6, 11.45, 2.4, 0.55, "Rural tehsil", "#FFF5CC", "#B7950B", size=9)
    box(ax, 14.2, 9.55, 10.6, 2.6, "", LIGHT["teal"], TEAL)
    ax.text(9.15, 10.55, "Layer 2 · Device", fontsize=10.5, fontweight="bold", color=TEAL, va="center")
    for x, t in [(11.2, "Smartphone"), (15.0, "USSD phone"), (18.3, "No phone")]:
        box(ax, x, 10.0, 2.9 if x != 18.3 else 2.2, 0.55, t, "white", TEAL, size=9, bold=True)
    for x, t in [(10.45, "Own"), (11.95, "Access"), (14.25, "Own"), (15.75, "Access")]:
        line(ax, 11.2 if x < 13 else 15.0, 9.72, x, 9.25)
        box(ax, x, 9.0, 1.3, 0.5, t, "white", "#7F7F7F", size=8.8)
    box(ax, 18.3, 9.0, 2.2, 0.5, "Shared or none", "white", "#7F7F7F", size=8.8)
    box(ax, 14.2, 7.4, 10.6, 1.25, "", LIGHT["teal"], TEAL)
    ax.text(9.15, 7.7, "Layer 3 · Capability", fontsize=10.5, fontweight="bold", color=TEAL, va="center")
    ax.text(9.15, 7.15, "Trainer inference after readiness, validated by the Capability Matrix", fontsize=8.8, color="#404040", va="center")
    arrow(ax, 7.9, 8.4, 8.85, 9.6)
    arrow(ax, 14.2, 6.75, 14.2, 6.15)
    # outputs
    box(ax, 6.0, 4.9, 7.6, 2.2, "Physical capability session (≈70%)\n\nSimulation on trainer tablet or own phone,\nrole play, group worksheets; then four weeks\nof channel-specific digital reinforcement",
        LIGHT["green"], GREEN, size=9.3)
    box(ax, 14.6, 4.9, 7.6, 2.2, "Digital capability track (≈30%)\n\nCapable women with their own phone: capability\ncontent by WhatsApp or IVR, one trainer clinic call;\nphysical session remains open on request",
        "#EDE4F5", "#6A3D9A", size=9.3)
    line(ax, 14.2, 6.15, 6.0, 6.0); line(ax, 14.2, 6.15, 14.6, 6.0)
    box(ax, 10.3, 2.4, 19.0, 1.2, "Channel package assigned automatically: smartphone → WhatsApp videos and messages (no IVR) · USSD phone → IVR and SMS (no video) · "
        "\nshared or no phone → household-phone IVR, peer educator follow-up and venue screening", LIGHT["grey"], "#7F7F7F", size=9.2)
    ax.text(10.3, 1.2, "The physical-to-digital composition is planned at 70:30 for each province as a whole; individual districts may sit above or below it "
            "(urban pockets more digital, remote rural tehsils less).", ha="center", fontsize=9, color="#404040", style="italic")
    fig.savefig(os.path.join(OUT, "fig_segmentation_flow.png"), dpi=220, bbox_inches="tight")
    plt.close(fig)


if __name__ == "__main__":
    fgd_frame(); journey(); segmentation()
