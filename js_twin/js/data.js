window.CATALOG_DATA = {
  "catalog": [
    {
      "id": "early-warning",
      "title": "Early Warning Command Center",
      "theme": "Insights to Impact",
      "icon": "🚨",
      "summary": "Real-time alerts with role-aware routing and executive briefs.",
      "excel_ref": "Real-Time Alerts & Early Warning System"
    },
    {
      "id": "insights-hub",
      "title": "Insights-to-Impact Hub",
      "theme": "Insights to Impact",
      "icon": "📈",
      "summary": "What / Why / Now What — performance drivers and action plans.",
      "excel_ref": "HQ: Insights to Impact engine"
    },
    {
      "id": "forecast-variance",
      "title": "Forecast Variance Simulator",
      "theme": "Insights to Impact",
      "icon": "🎯",
      "summary": "Actuals vs forecast variance with what-if levers.",
      "excel_ref": "Forecast variance analytics and simulation generator"
    },
    {
      "id": "research-search",
      "title": "Market Research Intelligence Search",
      "theme": "Market Intelligence",
      "icon": "🔍",
      "summary": "Multi-source RAG search with citations and trust scores.",
      "excel_ref": "Searchable market research at fingertips"
    },
    {
      "id": "research-gap",
      "title": "Research Gap Companion",
      "theme": "Market Intelligence",
      "icon": "🗺️",
      "summary": "Gap maps, study design recommendations, draft briefs.",
      "excel_ref": "Research Companion"
    },
    {
      "id": "digital-twin",
      "title": "Digital Twin Lab",
      "theme": "Market Intelligence",
      "icon": "👥",
      "summary": "Synthetic HCP/patient personas and what-if scenarios.",
      "excel_ref": "Synthetic Market Research"
    },
    {
      "id": "competitor-watch",
      "title": "Competitor Watchtower",
      "theme": "Market Intelligence",
      "icon": "🏰",
      "summary": "Competitor event timeline, sentiment, auto-briefings.",
      "excel_ref": "Competitor watch agent (Market Research theme)"
    },
    {
      "id": "presentation-builder",
      "title": "AI Presentation Builder",
      "theme": "Reporting & Copilot",
      "icon": "📊",
      "summary": "Prompt → data agent → chart agent → slide preview.",
      "excel_ref": "AI-generated presentations and automated refreshes"
    },
    {
      "id": "analytics-copilot",
      "title": "Analytics Copilot",
      "theme": "Reporting & Copilot",
      "icon": "🤖",
      "summary": "Natural language to KPIs, source links, next steps.",
      "excel_ref": "Real-time querying of insights via copilot"
    },
    {
      "id": "executive-reporting",
      "title": "Executive Reporting Pipeline",
      "theme": "Reporting & Copilot",
      "icon": "📑",
      "summary": "Scheduled agent workflow, delta reports, MBR preview.",
      "excel_ref": "PPT/Brief Composer + Report generation agents"
    }
  ],
  "scenarios": {
    "early-warning": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Signal Detector",
            "message": "Scanning 12 data streams for anomalies…",
            "delay_ms": 800
          },
          {
            "agent": "Signal Detector",
            "message": "3 significant shifts detected in Northeast region.",
            "delay_ms": 600
          },
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Notification Router",
            "message": "Routing HIGH alerts to Brand Lead & Field Directors…",
            "delay_ms": 500
          },
          {
            "agent": "Brief Composer",
            "message": "Generating executive alert brief…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "alerts": [
            {
              "id": 1,
              "severity": "high",
              "title": "Northeast share drop −2.4pp",
              "region": "Northeast",
              "metric": "Market Share",
              "change": "-2.4pp",
              "confidence": 0.92
            },
            {
              "id": 2,
              "severity": "medium",
              "title": "Formulary restriction — Payer X",
              "region": "Midwest",
              "metric": "Market Access",
              "change": "Tier 3 → Not Covered",
              "confidence": 0.88
            },
            {
              "id": 3,
              "severity": "high",
              "title": "Competitor launch signal — Phase III readout",
              "region": "National",
              "metric": "Competitive",
              "change": "New entrant Q3",
              "confidence": 0.85
            }
          ],
          "routing": [
            {
              "role": "Brand Lead",
              "alerts": 2,
              "channel": "Email + Dashboard"
            },
            {
              "role": "Field Director",
              "alerts": 1,
              "channel": "Mobile Push"
            },
            {
              "role": "Market Access",
              "alerts": 1,
              "channel": "Dashboard"
            }
          ],
          "brief": "Three early-warning signals require attention. Northeast share decline correlates with increased competitor detailing (+18%). Recommend targeted HCP engagement in Boston and Philadelphia metros within 2 weeks."
        }
      }
    },
    "insights-hub": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Signal Detector",
            "message": "Identifying subnational deviations from market baseline…",
            "delay_ms": 700
          },
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Driver Attribution",
            "message": "SHAP ranking: Access (−38%), Competitor share (+27%), Field coverage (−19%)…",
            "delay_ms": 900
          },
          {
            "agent": "Narrative Generator",
            "message": "Drafting So What summary for leadership…",
            "delay_ms": 600
          },
          {
            "agent": "Scenario Simulator",
            "message": "Modeling 3 intervention scenarios…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "regions": [
            {
              "name": "Northeast",
              "deviation": -2.4,
              "status": "critical"
            },
            {
              "name": "Southeast",
              "deviation": 0.8,
              "status": "positive"
            },
            {
              "name": "Midwest",
              "deviation": -1.1,
              "status": "watch"
            },
            {
              "name": "West",
              "deviation": 0.3,
              "status": "stable"
            },
            {
              "name": "Southwest",
              "deviation": -0.5,
              "status": "stable"
            }
          ],
          "drivers": [
            {
              "name": "Market Access",
              "impact": -38
            },
            {
              "name": "Competitor Share",
              "impact": 27
            },
            {
              "name": "Field Coverage",
              "impact": -19
            },
            {
              "name": "Patient Starts",
              "impact": 12
            },
            {
              "name": "Awareness",
              "impact": -8
            }
          ],
          "narrative": "Northeast underperformance is primarily access-driven following Payer X formulary change. Competitor Brand Y gained 1.8pp share in the same period.",
          "actions": [
            {
              "priority": 1,
              "action": "Launch payer engagement playbook for Payer X",
              "impact": "+1.2pp share"
            },
            {
              "priority": 2,
              "action": "Increase field coverage in Boston/Philly by 15%",
              "impact": "+0.8pp share"
            },
            {
              "priority": 3,
              "action": "Deploy patient support program messaging",
              "impact": "+0.4pp share"
            }
          ]
        }
      }
    },
    "forecast-variance": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Forecasting Agent",
            "message": "Loading forecast vs actuals by segment…",
            "delay_ms": 600
          },
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Variance Explainer",
            "message": "Decomposing −$4.2M gap across demand drivers…",
            "delay_ms": 800
          },
          {
            "agent": "Scenario Simulator",
            "message": "Calculating levers to close forecast gap…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "forecast": 42.5,
          "actual": 38.3,
          "variance_pct": -9.9,
          "unit": "M USD",
          "segments": [
            {
              "name": "Academic",
              "forecast": 12.0,
              "actual": 11.2,
              "variance": -6.7
            },
            {
              "name": "Community",
              "forecast": 18.5,
              "actual": 16.1,
              "variance": -13.0
            },
            {
              "name": "IDN",
              "forecast": 8.0,
              "actual": 7.5,
              "variance": -6.3
            },
            {
              "name": "Specialty",
              "forecast": 4.0,
              "actual": 3.5,
              "variance": -12.5
            }
          ],
          "drivers": [
            {
              "name": "New patient starts",
              "contribution": -2.1
            },
            {
              "name": "Persistency drop",
              "contribution": -1.4
            },
            {
              "name": "Access restrictions",
              "contribution": -0.9
            },
            {
              "name": "Inventory timing",
              "contribution": -0.3
            }
          ],
          "levers": [
            {
              "lever": "Increase new starts +8%",
              "required": true,
              "impact": 1.8
            },
            {
              "lever": "Improve persistency +5pts",
              "required": true,
              "impact": 1.2
            },
            {
              "lever": "Resolve top 3 access gaps",
              "required": true,
              "impact": 0.9
            },
            {
              "lever": "Expand field reach +10%",
              "required": false,
              "impact": 0.6
            }
          ]
        }
      },
      "simulate": {
        "steps": [
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Scenario Simulator",
            "message": "Applying selected levers to forecast model…",
            "delay_ms": 900
          },
          {
            "agent": "Scenario Simulator",
            "message": "Projected recovery: 97% of forecast achievable.",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "projected_actual": 41.2,
          "forecast": 42.5,
          "recovery_pct": 97,
          "message": "With all required levers activated, forecast gap closes from −9.9% to −3.1%."
        }
      }
    },
    "research-search": {
      "oncology-access": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Query Orchestrator",
            "message": "Interpreting intent: oncology market access trends…",
            "delay_ms": 500
          },
          {
            "agent": "Retrieval Agent",
            "message": "Searching internal corpus + PubMed + ClinicalTrials.gov…",
            "delay_ms": 900
          },
          {
            "agent": "Citation Agent",
            "message": "Verifying 8 source spans for grounding…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "query": "What are the latest oncology market access trends for IO combinations?",
          "summary": "Payer scrutiny on IO combination pricing intensified in 2025. Three of five major payers now require step therapy through monotherapy before combination approval.",
          "sources": [
            {
              "title": "Internal MR Report — IO Access Landscape Q1",
              "type": "Internal",
              "trust": 0.95,
              "date": "2025-03"
            },
            {
              "title": "PubMed: Payer policies in immuno-oncology (2024)",
              "type": "PubMed",
              "trust": 0.88,
              "date": "2024-11"
            },
            {
              "title": "ClinicalTrials.gov — IO combo Phase III pipeline",
              "type": "ClinicalTrials",
              "trust": 0.92,
              "date": "2025-01"
            },
            {
              "title": "Ad Board Summary — Payer panel insights",
              "type": "Internal",
              "trust": 0.9,
              "date": "2025-02"
            }
          ]
        }
      },
      "hcp-sentiment": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Query Orchestrator",
            "message": "Interpreting intent: HCP sentiment on new MOA…",
            "delay_ms": 500
          },
          {
            "agent": "Retrieval Agent",
            "message": "Scanning Sermo, ad boards, and social listening corpus…",
            "delay_ms": 800
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "query": "How are HCPs reacting to the new MOA in rheumatology?",
          "summary": "Overall sentiment is cautiously positive (62%). Key concern: long-term safety data gaps cited by 41% of KOLs in recent ad boards.",
          "sources": [
            {
              "title": "Social Listening Report — Rheum KOLs",
              "type": "Internal",
              "trust": 0.87,
              "date": "2025-04"
            },
            {
              "title": "Sermo Panel — MOA discussion thread",
              "type": "External",
              "trust": 0.78,
              "date": "2025-03"
            },
            {
              "title": "Ad Board Transcript — Safety & Efficacy",
              "type": "Internal",
              "trust": 0.93,
              "date": "2025-02"
            }
          ]
        }
      }
    },
    "research-gap": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Gap Analyzer",
            "message": "Mapping research coverage across topics and regions…",
            "delay_ms": 800
          },
          {
            "agent": "Study Recommender",
            "message": "Identifying 4 unaddressed KBQs…",
            "delay_ms": 700
          },
          {
            "agent": "Brief Generator",
            "message": "Drafting research brief for top priority gap…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "gaps": [
            {
              "topic": "Patient journey — post-diagnosis",
              "region": "EU",
              "coverage": 35,
              "priority": "high"
            },
            {
              "topic": "Payer willingness-to-pay",
              "region": "US",
              "coverage": 42,
              "priority": "high"
            },
            {
              "topic": "HCP switching behavior",
              "region": "APAC",
              "coverage": 28,
              "priority": "critical"
            },
            {
              "topic": "Competitive messaging recall",
              "region": "US",
              "coverage": 65,
              "priority": "medium"
            },
            {
              "topic": "Caregiver burden",
              "region": "LATAM",
              "coverage": 15,
              "priority": "high"
            }
          ],
          "recommendation": {
            "method": "Mixed-methods: quantitative survey + qualitative interviews",
            "sample": "n=400 HCPs, 60 patient interviews",
            "timeline": "8 weeks",
            "vendors": [
              "Vendor A (quant)",
              "Vendor B (qual)"
            ]
          },
          "brief_excerpt": "Objective: Understand HCP switching triggers in APAC markets where coverage is lowest (28%). Hypothesis: Access barriers drive switching more than efficacy perceptions…"
        }
      }
    },
    "digital-twin": {
      "hcp-persona": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Persona Agent",
            "message": "Building synthetic HCP persona from aggregate MR data…",
            "delay_ms": 700
          },
          {
            "agent": "Persona Agent",
            "message": "Calibrating against 2,400 prescriber profiles…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "persona": {
            "name": "Dr. Elena Vasquez (Synthetic)",
            "specialty": "Medical Oncologist",
            "setting": "Academic Medical Center — Northeast",
            "traits": [
              "Evidence-driven",
              "Access-sensitive",
              "Early adopter — cautious"
            ],
            "prescribing": "Prefers IO mono before combinations; cites NCCN and payer policy equally"
          },
          "scenario_q": "How would Dr. Vasquez react to a 15% price increase with unchanged efficacy data?",
          "scenario_a": "Likely to maintain current prescribing for existing patients but hesitate on new starts until payer coverage confirmed. Would request patient support program details before initiating.",
          "confidence": 0.84
        }
      },
      "patient-persona": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Persona Agent",
            "message": "Synthesizing patient persona from claims + forum aggregates…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "persona": {
            "name": "Patient Profile — Maya (Synthetic)",
            "condition": "Moderate-to-severe RA",
            "age_band": "45–54",
            "traits": [
              "Treatment-experienced",
              "Cost-conscious",
              "Digital health engaged"
            ],
            "journey": "Diagnosed 6 yrs ago; tried 2 prior MOAs; concerned about injection burden"
          },
          "scenario_q": "Would Maya switch to a monthly oral therapy if co-pay were $50/month?",
          "scenario_a": "High likelihood of switch intent (78% modeled probability). Key driver: reduced injection frequency. Barrier: uncertainty about new MOA side-effect profile.",
          "confidence": 0.79
        }
      }
    },
    "competitor-watch": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Competitor Watch",
            "message": "Monitoring 6 competitors across news, trials, social…",
            "delay_ms": 800
          },
          {
            "agent": "Event Detector",
            "message": "Flagging 2 significant events in last 7 days…",
            "delay_ms": 600
          },
          {
            "agent": "Briefing Agent",
            "message": "Compiling competitive intelligence brief…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "events": [
            {
              "date": "2025-06-22",
              "competitor": "Brand Y",
              "event": "Phase III topline — met primary endpoint",
              "significance": "high",
              "sentiment": -0.6
            },
            {
              "date": "2025-06-20",
              "competitor": "Brand Z",
              "event": "FDA label expansion — new indication",
              "significance": "medium",
              "sentiment": -0.3
            },
            {
              "date": "2025-06-18",
              "competitor": "Brand Y",
              "event": "Increased DTC campaign spend (+40%)",
              "significance": "medium",
              "sentiment": -0.4
            },
            {
              "date": "2025-06-15",
              "competitor": "Brand W",
              "event": "Payer contract win — national PBM",
              "significance": "high",
              "sentiment": -0.5
            }
          ],
          "brief": "Brand Y's positive Phase III readout is the highest-impact event this week. Combined with DTC ramp, expect share pressure in community segment within 60 days. Recommend accelerated KOL engagement and access contingency planning.",
          "sentiment_trend": [
            0.1,
            -0.1,
            -0.2,
            -0.35,
            -0.42,
            -0.48,
            -0.55
          ]
        }
      }
    },
    "presentation-builder": {
      "mbr-charts": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Data Input Agent",
            "message": "Fetching latest sales & share data via API…",
            "delay_ms": 600
          },
          {
            "agent": "Data Input Agent",
            "message": "Output: structured JSON with 4 KPI series.",
            "delay_ms": 400
          },
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Chart Agent",
            "message": "Generating trend line + waterfall charts…",
            "delay_ms": 800
          },
          {
            "agent": "Document Agent",
            "message": "Embedding live Excel objects into slide layout…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "prompt": "Build MBR slides for Brand X — sales trend, share waterfall, regional breakdown",
          "slides": [
            {
              "title": "Sales Trend — YTD",
              "type": "line",
              "data": [
                8.2,
                8.5,
                8.1,
                8.8,
                9.0,
                8.7,
                9.2
              ]
            },
            {
              "title": "Share Waterfall — vs Prior Month",
              "type": "waterfall",
              "data": [
                {
                  "label": "Start",
                  "value": 18.2
                },
                {
                  "label": "Volume",
                  "value": 0.4
                },
                {
                  "label": "Access",
                  "value": -0.8
                },
                {
                  "label": "Competition",
                  "value": -0.3
                },
                {
                  "label": "End",
                  "value": 17.5
                }
              ]
            },
            {
              "title": "Regional Share",
              "type": "bar",
              "data": [
                {
                  "region": "NE",
                  "share": 19.1
                },
                {
                  "region": "SE",
                  "share": 20.3
                },
                {
                  "region": "MW",
                  "share": 16.8
                },
                {
                  "region": "W",
                  "share": 18.5
                }
              ]
            }
          ],
          "refreshed_at": "2025-06-28T09:00:00Z"
        }
      },
      "refresh": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Data Input Agent",
            "message": "Pulling latest data refresh…",
            "delay_ms": 500
          },
          {
            "agent": "Chart Agent",
            "message": "Updating 3 charts with new data points…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "message": "Presentation refreshed with data through June 27. Share slide updated: 17.5% → 17.8% (+0.3pp).",
          "updated_slides": 3
        }
      }
    },
    "analytics-copilot": {
      "share-decline": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Query Orchestrator",
            "message": "Understanding: 'Why did share drop in Northeast last month?'",
            "delay_ms": 500
          },
          {
            "agent": "Insight Retrieval",
            "message": "Fetching KPIs from DataLens + ODP dashboards…",
            "delay_ms": 800
          },
          {
            "agent": "Analytics Agent",
            "message": "Running anomaly detection and driver attribution…",
            "delay_ms": 700
          },
          {
            "agent": "Recommendation Agent",
            "message": "Generating next-step recommendations…",
            "delay_ms": 600
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "query": "Why did share drop in Northeast last month?",
          "kpis": [
            {
              "label": "Northeast Share",
              "value": "17.2%",
              "change": "-2.4pp",
              "trend": "down"
            },
            {
              "label": "Competitor Share",
              "value": "22.1%",
              "change": "+1.8pp",
              "trend": "up"
            },
            {
              "label": "Access Score",
              "value": "68",
              "change": "-12pts",
              "trend": "down"
            }
          ],
          "sources": [
            {
              "name": "ODP — Regional Performance",
              "url": "#odp-regional"
            },
            {
              "name": "DataLens — Access Dashboard",
              "url": "#datalens-access"
            }
          ],
          "recommendations": [
            "Review Payer X formulary change impact",
            "Compare field activity vs competitor in Boston metro",
            "Open Insights Hub for full driver decomposition"
          ]
        }
      },
      "top-accounts": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Query Orchestrator",
            "message": "Understanding: 'Show top 5 accounts by growth potential'",
            "delay_ms": 500
          },
          {
            "agent": "Insight Retrieval",
            "message": "Running account scoring model…",
            "delay_ms": 700
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "query": "Show top 5 accounts by growth potential",
          "kpis": [
            {
              "label": "Accounts Analyzed",
              "value": "248",
              "change": "",
              "trend": "neutral"
            },
            {
              "label": "High-Potential",
              "value": "5",
              "change": "+2 vs LQ",
              "trend": "up"
            }
          ],
          "accounts": [
            {
              "name": "Metro Health System",
              "score": 94,
              "opportunity": "$1.2M"
            },
            {
              "name": "Pacific Care Network",
              "score": 91,
              "opportunity": "$980K"
            },
            {
              "name": "Summit Medical Group",
              "score": 88,
              "opportunity": "$850K"
            },
            {
              "name": "Heartland IDN",
              "score": 85,
              "opportunity": "$720K"
            },
            {
              "name": "Coastal Specialty",
              "score": 82,
              "opportunity": "$650K"
            }
          ],
          "sources": [
            {
              "name": "CRM — Account Scoring",
              "url": "#crm-scoring"
            }
          ],
          "recommendations": [
            "Prioritize Metro Health for Q3 targeting",
            "Schedule field ride-alongs for top 3"
          ]
        }
      }
    },
    "executive-reporting": {
      "default": {
        "steps": [
          {
            "agent": "Orchestrator",
            "message": "Parsing request and routing to specialist agents…",
            "delay_ms": 400
          },
          {
            "agent": "Data Agent",
            "message": "Loading curated datasets from single source of truth…",
            "delay_ms": 600
          },
          {
            "agent": "Delta Analyzer",
            "message": "Comparing current vs last MBR run (June 21)…",
            "delay_ms": 700
          },
          {
            "agent": "Report Generator",
            "message": "Building executive summary with change highlights…",
            "delay_ms": 800
          },
          {
            "agent": "Notification Router",
            "message": "Scheduling delivery to leadership distribution list…",
            "delay_ms": 500
          },
          {
            "agent": "Narrative Agent",
            "message": "Synthesizing insights and recommended actions…",
            "delay_ms": 500
          },
          {
            "agent": "Delivery Agent",
            "message": "Packaging results for dashboard view…",
            "delay_ms": 300
          }
        ],
        "result": {
          "schedule": "Weekly — Mondays 07:00 ET",
          "last_run": "2025-06-21",
          "current_run": "2025-06-28",
          "deltas": [
            {
              "metric": "National Share",
              "before": "18.2%",
              "after": "17.8%",
              "highlight": true
            },
            {
              "metric": "Sales (M)",
              "before": "$9.0M",
              "after": "$9.2M",
              "highlight": false
            },
            {
              "metric": "New Patient Starts",
              "before": "1,240",
              "after": "1,180",
              "highlight": true
            },
            {
              "metric": "Access Score",
              "before": "74",
              "after": "68",
              "highlight": true
            }
          ],
          "pipeline_steps": [
            {
              "step": "Extract",
              "status": "complete"
            },
            {
              "step": "Analyze",
              "status": "complete"
            },
            {
              "step": "Generate Deck",
              "status": "complete"
            },
            {
              "step": "Route & Notify",
              "status": "complete"
            }
          ],
          "brief": "Weekly MBR ready. 3 metrics flagged vs prior run. Primary driver: access restrictions in Northeast. Deck attached to leadership portal."
        }
      }
    }
  }
};

function getDemoResponse(demoId, scenario) {
  const demo = window.CATALOG_DATA.scenarios[demoId];
  if (!demo) return { error: "Unknown demo: " + demoId };
  const payload = demo[scenario] || demo.default;
  if (!payload) return { error: "Unknown scenario: " + scenario };
  return payload;
}

function runDemo(demoId, scenario) {
  return Promise.resolve(getDemoResponse(demoId, scenario || "default"));
}

window.getDemoResponse = getDemoResponse;
window.runDemo = runDemo;
