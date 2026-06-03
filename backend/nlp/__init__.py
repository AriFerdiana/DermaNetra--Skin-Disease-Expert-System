"""
DermaNetra NLP Module
=====================
Provides Bahasa Indonesia text preprocessing and symptom matching
for the NLP-based diagnosis mode.

Public API:
  - preprocess(text)         -> list[str]  (stemmed tokens)
  - match_symptoms(text)     -> list[dict] (matched symptom IDs + scores)
  - get_pipeline_info(text)  -> dict       (step-by-step NLP detail)
"""

from .preprocessor import preprocess, get_pipeline_steps
from .symptom_matcher import match_symptoms, get_pipeline_info

__all__ = ["preprocess", "get_pipeline_steps", "match_symptoms", "get_pipeline_info"]
