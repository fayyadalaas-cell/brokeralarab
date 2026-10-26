
from pathlib import Path
import shutil
import sys

ROOT = Path.cwd()

target = ROOT / "app" / "technical-analysis" / "TechnicalAnalysisHubClient.tsx"

if not target.is_file():
    raise RuntimeError(
        f"Arabic technical analysis component not found: {target}"
    )
original = target.read_text(encoding="utf-8")
code = original


def change(old, new, expected=1):
    global code

    count = code.count(old)

    if count != expected:
        raise RuntimeError(
            f"PATCH BLOCKED: expected {expected} matches, "
            f"found {count}: {old[:70]!r}"
        )

    code = code.replace(old, new, expected)


# Move selected symbol above the levels-fetching effect.
change(
    '  const [symbol, setSymbol] = useState("XAUUSDc");',
    ""
)

change(
    'const [mobilePivotOpen, setMobilePivotOpen] = useState(false);',
    '''const [mobilePivotOpen, setMobilePivotOpen] = useState(false);
const [symbol, setSymbol] = useState("XAUUSDc");'''
)

# Fetch the selected instrument, not gold only.
change(
    'endpoint.searchParams.set("symbol", "eq.XAUUSDc");',
    'endpoint.searchParams.set("symbol", `eq.${symbol}`);'
)

change(
    'row.symbol !== "XAUUSDc" ||',
    'row.symbol !== symbol ||'
)

# Clear previous instrument levels when changing symbols.
change(
    '''useEffect(() => {
  let cancelled = false;
  let running = false;

  async function loadTechnicalLevels()''',
    '''useEffect(() => {
  let cancelled = false;
  let running = false;

  setLevelsByFrame({});
  setLevelsLoading(true);
  setLevelsError(false);
  setSelectedGoldZone(null);

  async function loadTechnicalLevels()'''
)

change(
    '''        setLevelsError(true);
      }

    } finally''',
    '''        setLevelsByFrame({});
        setLevelsError(true);
      }

    } finally'''
)

change(
    '''}, []);




  const [compareFirst''',
    '''}, [symbol]);




  const [compareFirst'''
)

# Never display a row belonging to another instrument.
change(
    'const selectedLevels = levelsByFrame[timeframe] ?? null;',
    '''const selectedLevels =
  levelsByFrame[timeframe]?.symbol === symbol
    ? levelsByFrame[timeframe]!
    : null;'''
)

# Published "live" does not mean the snapshot stays fresh.
change(
    '''const selectedLevelsHistorical =
  selectedLevels?.data_status === "historical";''',
    '''const selectedLevelsHistorical =
  selectedLevels?.data_status === "historical" ||
  (selectedLevels !== null &&
    !isFresh(selectedLevels.reference_time_utc, 15));'''
)

# Allow overview levels to use any selected instrument.
change(
    '    isGoldSelected && selectedLevels !== null;',
    '    selectedLevels !== null;'
)

# Instrument-specific number precision.
change(
    '''  const fmt = (value: number | null) =>
    value === null
      ? "—"
      : new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);''',
    '''  const levelDigits =
    symbol === "XAUUSDc" ? 2 :
    symbol === "XAGUSDc" ? 3 :
    symbol.endsWith("JPYc") ||
    symbol.endsWith("HUFc") ? 3 :
    symbol.endsWith("CZKc") ? 4 : 5;

  const fmt = (value: number | null) =>
    formatPrice(value, levelDigits);'''
)

# Forex distances and prices are not US dollar amounts.
change(
    ': `$${fmt(zone.distance)}`}',
    ': fmt(zone.distance)}'
)

change(
    ': `$${fmt(referencePrice)}`}',
    ': fmt(referencePrice)}'
)

# Remove gold-only rendering restrictions.
change(
    '{supportSymbol !== "XAUUSDc" ? (',
    '{!selectedLevels ? (',
    2
)

change(
    '{supportSymbol === "XAUUSDc" ? (',
    '{selectedLevels ? ('
)

# Display correct availability labels.
change(
    '''{symbol === "XAUUSDc"
                  ? "المستويات متاحة"
                  : "المستويات غير منشورة"}''',
    '''{selectedLevels
                  ? (selectedLevelsHistorical
                      ? "مستويات محفوظة — تحقق من وقتها"
                      : "المستويات متاحة")
                  : (levelsLoading
                      ? "جاري تحميل المستويات"
                      : "المستويات غير متاحة")}'''
)

change(
    '''{symbol === "XAUUSDc"
          ? `${supportZones.length} دعوم · ${resistanceZones.length} مقاومات · ${timeframe}`
          : "المستويات غير منشورة لهذه الأداة"}''',
    '''{selectedLevels
          ? `${supportZones.length} دعوم · ${resistanceZones.length} مقاومات · ${timeframe}`
          : (levelsLoading
              ? "جاري تحميل المستويات"
              : "المستويات غير متاحة لهذه الأداة")}'''
)

# Generalize section headings and empty states.
change(
    'سيتم عرض مستويات الذهب بعد توفر تقرير',
    'سيتم عرض المستويات بعد توفر تقرير'
)

change(
    'خريطة المناطق السعرية للذهب',
    'خريطة المناطق السعرية لـ {selectedInstrument.name}'
)

change(
    'النقاط المحورية متاحة للذهب فقط حالياً',
    'لا توجد نقاط محورية منشورة لهذه الأداة حالياً'
)

# Correct pivot and OHLC precision.
change(
    '? formatPrice(pivotLevels.P, 2)',
    '? formatPrice(pivotLevels.P, levelDigits)'
)

change(
    'formatPrice(pivotLevels[key], 2)',
    'formatPrice(pivotLevels[key], levelDigits)',
    2
)

change(
    'formatPrice(pivotLevels.P, 2)',
    'formatPrice(pivotLevels.P, levelDigits)'
)

change(
    'formatPrice(item.value, 2)',
    'formatPrice(item.value, levelDigits)'
)

# Replace gold-only asset labels in the pivot section.
start = code.index(
    '  {/* ====================================================\n'
    '    V3.1 — PIVOT POINTS'
)
end = code.index('{/* FOOTER */}', start)

section = code[start:end]

if section.count("XAU/USD") != 3:
    raise RuntimeError("Unexpected pivot asset labels")

section = section.replace(
    "XAU/USD",
    "{selectedInstrument.base}/{selectedInstrument.quote}"
)

code = code[:start] + section + code[end:]

# Freshness warning when the report is old.
change(
    '{pivotStatusText(selectedLevels.data_status)}',
    '''{selectedLevelsHistorical
            ? "بيانات محفوظة — ليست تحديثاً مباشراً"
            : pivotStatusText(selectedLevels.data_status)}'''
)

# Save only after every required replacement succeeded.
backup = target.with_suffix(".tsx.before_all_levels.bak")

if backup.exists():
    raise RuntimeError(
        "Backup already exists. Refusing to overwrite."
    )

shutil.copy2(target, backup)
target.write_text(code, encoding="utf-8")

print("=" * 55)
print("TECHNICAL LEVELS PATCH APPLIED")
print("Updated:", target)
print("Backup:", backup)
print("All selected instruments now supported")
print("No Supabase writes")
print("=" * 55)
