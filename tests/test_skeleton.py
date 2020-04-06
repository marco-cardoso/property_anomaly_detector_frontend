# -*- coding: utf-8 -*-

import pytest
from property_anomaly_detector.skeleton import fib

__author__ = "Marco Cardoso"
__copyright__ = "Marco Cardoso"
__license__ = "mit"


def test_fib():
    assert fib(1) == 1
    assert fib(2) == 1
    assert fib(7) == 13
    with pytest.raises(AssertionError):
        fib(-10)
